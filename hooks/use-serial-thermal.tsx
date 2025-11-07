"use client";

import { useCallback, useRef, useState } from "react";

const ESC = "\x1B";
const CRLF = "\r\n";

function init(codepage = 0) {
  return ESC + "@" + ESC + "t" + String.fromCharCode(codepage);
}
const alignLeft = ESC + "a" + "\x00";
const alignCenter = ESC + "a" + "\x01";
const boldOn = ESC + "E" + "\x01";
const boldOff = ESC + "E" + "\x00";

function strToBytes(s: string) {
  return new TextEncoder().encode(s);
}

export type SerialStatus = "disconnected" | "connected" | "printing" | "error";

export function useSerialThermal() {
  const portRef = useRef<any>(null);
  const [status, setStatus] = useState<SerialStatus>("disconnected");
  const [lastError, setLastError] = useState<string | null>(null);

  const assertEnv = useCallback(() => {
    if (!("serial" in navigator)) {
      throw new Error(
        "Browser tidak mendukung Web Serial. Gunakan Chrome/Edge di HTTPS/localhost."
      );
    }
    if (!self.isSecureContext && location.hostname !== "localhost") {
      throw new Error("Web Serial wajib HTTPS atau localhost.");
    }
  }, []);

  const tryOpen = useCallback(async (port: any, baudRate: number) => {
    try {
      await port.open({
        baudRate,
        dataBits: 8,
        stopBits: 1,
        parity: "none",
        flowControl: "none",
        bufferSize: 255,
      } as any);
      return true;
    } catch (err: any) {
      return false;
    }
  }, []);

  const ensureOpen = useCallback(
    async (baudRate = 9600) => {
      assertEnv();

      // pakai port yang sudah diizinkan bila ada
      let [port] = await (navigator as any).serial.getPorts();

      // kalau belum ada izin, minta user pilih (harus dari klik)
      if (!port) {
        // filter umum untuk printer thermal USB-Serial
        const filters = [
          { usbVendorId: 0x1a86, usbProductId: 0x7523 }, // CH340/CH341
          { usbVendorId: 0x067b }, // Prolific PL2303 (productId bervariasi)
        ];
        port = await (navigator as any).serial
          .requestPort({ filters })
          .catch((e: any) => {
            throw new Error("Pemilihan perangkat dibatalkan.");
          });
      }

      // Jika sudah terbuka, pakai ulang
      if ((port as any).readable && (port as any).writable) {
        portRef.current = port;
        setStatus("connected");
        return;
      }

      // Coba beberapa baud umum
      const candidates = [baudRate, 19200, 115200, 9600].filter(
        (v, i, a) => a.indexOf(v) === i
      );

      let opened = false;
      for (const br of candidates) {
        opened = await tryOpen(port, br);
        if (opened) break;
      }
      if (!opened) {
        throw new Error(
          "Gagal membuka port. Pastikan tidak dipakai app lain (mis. QZ Tray), driver terpasang, dan coba cabut-colok kabel."
        );
      }

      portRef.current = port;
      setStatus("connected");

      // Tutup otomatis saat device dicabut
      (port as any).addEventListener?.("disconnect", () => {
        portRef.current = null;
        setStatus("disconnected");
      });
    },
    [assertEnv, tryOpen]
  );

  const connect = useCallback(
    async (baudRate = 9600) => {
      try {
        setLastError(null);
        await ensureOpen(baudRate);
        const info = (portRef.current as any)?.getInfo?.();
        alert(
          `Terhubung: ${
            info
              ? `VID:${info.usbVendorId ?? "-"} PID:${info.usbProductId ?? "-"}`
              : "Serial"
          }`
        );
      } catch (e: any) {
        setStatus("error");
        setLastError(e?.message || String(e));
        throw e;
      }
    },
    [ensureOpen]
  );

  const disconnect = useCallback(async () => {
    if (!portRef.current) return;
    try {
      await portRef.current.close();
    } catch {}
    portRef.current = null;
    setStatus("disconnected");
  }, []);

  const writeBytes = useCallback(async (bytes: Uint8Array) => {
    // NOTE: di sini TIDAK memanggil requestPort lagi.
    if (!portRef.current) {
      throw new Error(
        "Belum terhubung ke printer. Klik 'Hubungkan Printer' dulu."
      );
    }
    const writer = portRef.current.writable!.getWriter();
    try {
      setStatus("printing");
      await writer.write(bytes);
    } finally {
      writer.releaseLock();
      setStatus("connected");
    }
  }, []);

  const printBatch = useCallback(
    async (p: {
      batchCode: string;
      ingredientName: string;
      entryDate?: string;
      expiryDate?: string;
      storageLocation?: string;
    }) => {
      const s = (v?: string) => (v == null ? "-" : String(v));
      const now = new Date().toLocaleString("id-ID");
      const payload =
        init(0) +
        alignCenter +
        boldOn +
        "KODE BATCH" +
        CRLF +
        boldOff +
        alignCenter +
        s(p.ingredientName) +
        CRLF +
        boldOn +
        s(p.batchCode) +
        CRLF +
        boldOff +
        alignLeft +
        `Masuk   : ${s(p.entryDate)}` +
        CRLF +
        `Expired : ${s(p.expiryDate)}` +
        CRLF +
        `Lokasi  : ${s(p.storageLocation)}` +
        CRLF +
        `Cetak   : ${now}` +
        CRLF +
        CRLF +
        alignCenter +
        "--- Terima kasih ---" +
        CRLF +
        CRLF +
        CRLF +
        CRLF;

      await writeBytes(strToBytes(payload));
      alert("Print via Serial terkirim ✅");
    },
    [writeBytes]
  );

  const printBase64 = useCallback(
    async (base64: string) => {
      const buf = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      await writeBytes(buf);
    },
    [writeBytes]
  );

  return { status, lastError, connect, disconnect, printBatch, printBase64 };
}
