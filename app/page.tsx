import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/public/logo.svg";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#17261a]">
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="#"
            className="flex items-center gap-2 font-bold text-[#2e7d32]"
          >
            <div className="flex md:flex-1">
              <nav className="flex items-center space-x-4 lg:space-x-6">
                <div className="flex flex-col items-start justify-center">
                  <div className="relative flex items-center">
                    <Image
                      src={logo}
                      alt="Kulkita Logo"
                      width={30}
                      height={30}
                      className="absolute"
                    />
                    <h1 className="text-3xl font-normal font-lalezar tracking-tight text-[#4CAF50] pt-3 pl-7">
                      ulkita
                    </h1>
                  </div>
                  <p className="hidden sm:block text-xs font-sourceSansPro text-[#333]">
                    SEGAR TERKELOLA, GIZI TERSALUR
                  </p>
                </div>
              </nav>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-[#264c31] md:flex">
            <Link href="#fitur" className="hover:text-[#2e7d32]">
              Fitur
            </Link>
            <Link href="#solusi" className="hover:text-[#2e7d32]">
              Solusi
            </Link>
            <Link href="#partnership" className="hover:text-[#2e7d32]">
              Partnership
            </Link>
            <Link href="#resources" className="hover:text-[#2e7d32]">
              Resources
            </Link>
            <Link href="#harga" className="hover:text-[#2e7d32]">
              Harga
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-[#2e7d32]" asChild>
              <Link href="/auth">Sign in</Link>
            </Button>
            <Button id="cta" className="bg-[#2e7d32] hover:bg-[#1f5e25]">
              <Link href="/dashboard"> Coba Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* <div className=" bg-[#e4f3e5]">
        <Image
          className="absolute left-20"
          src="/ai.svg"
          alt="ai"
          width={100}
          height={100}
        />
        <div className="container mx-auto flex items-stretch gap-x-4 translate-x-28 py-3 leading-normal">
          <div className="flex-1 flex flex-col justify-center text-[#1b4332] leading-normal">
            <p className="font-semibold font-poppins leading-normal">
              Ketahui sisa hari sebelum bahan makanan segar mengalami kebusukan
            </p>

            <p className="text-sm opacity-90">
              Solusi end-to-end untuk mencegah food loss dan keracunan makanan
            </p>
          </div>
        </div>
      </div> */}

      <section className="relative overflow-hidden">
        <div className="container mx-auto grid px-4 py-16 md:grid-cols-2 md:py-24 lg:gap-10">
          <div className="flex flex-col justify-center max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-[#2e7d32]">
              Manajemen Inventori Bahan Segar
            </p>
            <h1
              className="mt-3 max-w-2xl text-2xl md:text-3xl lg:text-4xl
             font-extrabold tracking-tight text-[#0e1b12]
             leading-normal
             space-y-2 lg:space-y-3"
            >
              <span className="block">
                Ketahui kondisi bahan segar di Dapur
              </span>
              <span className="block">melalui aplikasi inventory</span>
              <span className="block text-[#2e7d32]">bahan segar #1</span>
              <span className="block">di Indonesia</span>
            </h1>

            <p className="mt-4 max-w-2xl text-[#405a49]">
              Buat keputusan penanganan bahan yang tepat dari data real‑time
              mulai dari kategori kesegaran bahan hingga kebutuhan bahan tiap
              unit dapur.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" className="bg-[#2e7d32] hover:bg-[#1f5e25]">
                <Link href="/dashboard"> Coba Gratis</Link>
              </Button>
            </div>
          </div>

          <div className="relative mt-10 md:mt-0">
            <Image
              priority
              src="/fresh-vegitables.svg"
              fill
              className="relative z-10 mx-auto w-full"
              alt="Keranjang sayur segar"
            />
          </div>
        </div>
      </section>

      <section id="fitur" className="bg-[#f6fbf7]">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            Bagaimana Kulkita membantu{" "}
            <span className="text-[#2e7d32]">
              mitra dalam mengurangi food waste
            </span>
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              image="/kulkita-dashboard.svg"
              title="Kulkita Dashboard"
              desc="Memantau kondisi bahan segar secara real‑time, melihat status kesegaran (hijau‑kuning‑merah) untuk mencegah pembusukan dan mengoptimalkan stok."
              cta="Coba sekarang"
            />
            <FeatureCard
              image="/kulkita-inventory.svg"
              title="Kulkita Inventory"
              desc="Mengelola input dan output bahan segar secara akurat, merekam kategori, berat, supplier, tanggal masuk, hingga lokasi penyimpanan untuk manajemen bahan segar yang rapi."
              cta="Coba sekarang"
            />
            <FeatureCard
              image="/kulkita-prediction.svg"
              title="Kulkita Prediction"
              desc="Mengetahui perkiraan masa simpan bahan segar dan pemberitahuan notifikasi stok akan memburuk. Menandai status kesegaran (hijau‑kuning‑merah) sehingga dapat bertindak cepat."
              cta="Coba sekarang"
            />
            <FeatureCard
              image="/kulkita-redistribusi.svg"
              title="Kulkita Redistribusi"
              desc="Melatih dan menanggung permintaan untuk penawaran bahan segar berlebih/ kekurangan di unit gizi lain. Untuk menangani overstock dan understock, serta mencegah food waste di wilayah tertentu."
              cta="Coba sekarang"
            />
          </div>
        </div>
      </section>

      <footer className="border-t bg-[#f8faf9]">
        <div className="container mx-auto grid gap-6 px-4 py-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#2e7d32]">
              <Image
                src="/logo.svg"
                alt="Kulkita"
                width={28}
                height={28}
                className="absolute"
              />
              <h1 className="text-3xl font-normal font-lalezar tracking-tight text-[#4CAF50] pt-3 pl-7">
                ulkita
              </h1>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-[#264c31]">Produk</div>
            <ul className="mt-3 space-y-2 text-[#53725f]">
              <li>
                <Link href="#fitur" className="hover:text-[#2e7d32]">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="#resources" className="hover:text-[#2e7d32]">
                  Panduan
                </Link>
              </li>
              <li>
                <Link href="#harga" className="hover:text-[#2e7d32]">
                  Harga
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-[#264c31]">Perusahaan</div>
            <ul className="mt-3 space-y-2 text-[#53725f]">
              <li>
                <Link href="#partnership" className="hover:text-[#2e7d32]">
                  Partnership
                </Link>
              </li>
              <li>
                <Link href="#resources" className="hover:text-[#2e7d32]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#kontak" className="hover:text-[#2e7d32]">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-[#6a8573]">
          © {new Date().getFullYear()} Kulkita. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  image,
  title,
  desc,
  cta,
}: {
  image: string;
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <Card className="overflow-hidden border-[#e2efe6] bg-[#E4F3E5] rounded-2xl">
      <div className="relative aspect-[4/3] w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg text-[#0e1b12]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="flex-1 text-sm leading-relaxed max-w-xs text-[#405a49] min-h-[20vh]">
          {desc}
        </p>

        <Button
          variant="link"
          className="mt-3 px-0 text-[#2e7d32] self-start"
          asChild
        >
          <Link href="#">{cta} →</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
