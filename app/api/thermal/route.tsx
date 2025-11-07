import { NextResponse } from "next/server";
import {
  render,
  Printer,
  Text,
  Row,
  Br,
  Line,
  QRCode,
  Cut,
} from "react-thermal-printer";

export async function POST(req: Request) {
  try {
    const {
      batchCode,
      ingredientName,
      entryDate,
      expiryDate,
      storageLocation,
      width = 42,
      type = "epson",
      withQR = true,
    } = await req.json();

    const ticket = (
      <Printer type={type as any} width={Number(width)}>
        <Text align="center" bold size={{ width: 2, height: 2 }}>
          KODE BATCH
        </Text>
        <Text align="center">{ingredientName}</Text>
        <Br />
        <Line />
        <Text align="center" bold>
          {batchCode}
        </Text>
        <Br />
        <Row left="Masuk" right={entryDate ?? "-"} />
        <Row left="Expired" right={expiryDate ?? "-"} />
        <Row left="Lokasi" right={storageLocation ?? "-"} />
        <Line />
        {withQR && (
          <>
            <Text align="center">Scan untuk detail</Text>
            <QRCode align="center" content={batchCode} />
            <Br />
          </>
        )}
        <Cut />
      </Printer>
    );

    const bytes: Uint8Array = await render(ticket);
    console.log(bytes);

    const base64 =
      typeof Buffer !== "undefined"
        ? Buffer.from(bytes).toString("base64")
        : btoa(String.fromCharCode(...bytes));
    console.log(base64);
    return NextResponse.json({ ok: true, base64 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Failed to render ticket" },
      { status: 500 }
    );
  }
}
