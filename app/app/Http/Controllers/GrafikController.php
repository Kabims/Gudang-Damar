<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\AktivitasBarang;
use App\Models\Pesanan;
use App\Models\Servis;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class GrafikController extends Controller
{
    /**
     * Halaman utama grafik/analytics.
     * Menyediakan semua data yang dibutuhkan index.vue
     */
    public function index(Request $request)
    {
        $period = $request->input('period', 'YTD'); // 1D | 1W | 1M | 3M | YTD | 1Y | 5Y

        if ($request->wantsJson()) {
            $type = $request->input('type');
            if ($type === 'revenue') {
                return response()->json([
                    'revenueTrend' => $this->getRevenueTrend($period),
                ]);
            } elseif ($type === 'pesanan') {
                return response()->json([
                    'pesananTrend' => $this->getPesananTrend($period),
                ]);
            } elseif ($type === 'servis') {
                return response()->json([
                    'servisTrend' => $this->getServisTrend($period),
                ]);
            }

            return response()->json([
                'revenueTrend' => $this->getRevenueTrend($period),
                'pesananTrend' => $this->getPesananTrend($period),
                'servisTrend'  => $this->getServisTrend($period),
                'activePeriod' => $period,
            ]);
        }

        return Inertia::render('grafik/index', [
            // ── Summary Cards ──────────────────────────────────────────────
            'summaryCards'      => $this->getSummaryCards(),

            // ── Revenue Trend (bar chart utama) ────────────────────────────
            'revenueTrend'      => $this->getRevenueTrend($period),

            // ── Revenue by Category (bahan) ────────────────────────────────
            'revenueByCategory' => $this->getRevenueByCategory(),

            // ── Stok & Penjualan Barang ─────────────────────────────────────
            'topStok'           => $this->getTopStok(),
            'topTerjual'        => $this->getTopTerjual(),

            // ── Pesanan ─────────────────────────────────────────────────────
            'pesananTrend'      => $this->getPesananTrend($period),
            'topPesanan'        => $this->getTopPesanan(),

            // ── Servis ──────────────────────────────────────────────────────
            'servisTrend'       => $this->getServisTrend($period),
            'topServis'         => $this->getTopServis(),

            // Kirim period aktif agar Vue tahu tombol mana yang aktif
            'activePeriod'      => $period,
        ]);
    }

    // =========================================================================
    //  SUMMARY CARDS
    // =========================================================================

    /**
     * Hitung 3 kartu ringkasan di bagian atas:
     *   1. Total Revenue (pendapatan semua sumber)
     *   2. YTD Growth vs tahun lalu
     *   3. Peak Revenue Period (bulan / kuartal terbaik)
     */
    private function getSummaryCards(): array
    {
        $nowLocal  = Carbon::now('Asia/Jakarta');

        // ── Hitung revenue 3 periode sekaligus dengan 1 query per tabel ──
        $thisMonthStart = $nowLocal->copy()->startOfMonth()->setTimezone('UTC')->toDateTimeString();
        $thisMonthEnd   = $nowLocal->copy()->endOfMonth()->setTimezone('UTC')->toDateTimeString();
        $lastMonthStart = $nowLocal->copy()->startOfMonth()->subMonth()->setTimezone('UTC')->toDateTimeString();
        $lastMonthEnd   = $nowLocal->copy()->startOfMonth()->subMonth()->endOfMonth()->setTimezone('UTC')->toDateTimeString();
        $sameMonthLastYearStart = $nowLocal->copy()->startOfMonth()->subYear()->setTimezone('UTC')->toDateTimeString();
        $sameMonthLastYearEnd   = $nowLocal->copy()->startOfMonth()->subYear()->endOfMonth()->setTimezone('UTC')->toDateTimeString();

        // Barang revenue - 1 query untuk 3 periode
        $barangRevenues = DB::table('aktivitas_barang')
            ->where('jenis', 'jual')
            ->selectRaw("
                SUM(CASE WHEN tanggal BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as this_month,
                SUM(CASE WHEN tanggal BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as last_month,
                SUM(CASE WHEN tanggal BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as same_month_ly
            ", [$thisMonthStart, $thisMonthEnd, $lastMonthStart, $lastMonthEnd, $sameMonthLastYearStart, $sameMonthLastYearEnd])
            ->first();

        // Pesanan revenue - 1 query untuk 3 periode
        $pesananRevenues = DB::table('pesanan')
            ->whereNotNull('tanggalterkirim')
            ->selectRaw("
                SUM(CASE WHEN tanggalterkirim BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as this_month,
                SUM(CASE WHEN tanggalterkirim BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as last_month,
                SUM(CASE WHEN tanggalterkirim BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as same_month_ly
            ", [$thisMonthStart, $thisMonthEnd, $lastMonthStart, $lastMonthEnd, $sameMonthLastYearStart, $sameMonthLastYearEnd])
            ->first();

        // Servis revenue - 1 query untuk 3 periode
        $servisRevenues = DB::table('servis')
            ->where('tanggalterkirim', '!=', '1970-01-01 00:00:00')
            ->whereNotNull('tanggalterkirim')
            ->selectRaw("
                SUM(CASE WHEN tanggalterkirim BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as this_month,
                SUM(CASE WHEN tanggalterkirim BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as last_month,
                SUM(CASE WHEN tanggalterkirim BETWEEN ? AND ? THEN pendapatan ELSE 0 END) as same_month_ly
            ", [$thisMonthStart, $thisMonthEnd, $lastMonthStart, $lastMonthEnd, $sameMonthLastYearStart, $sameMonthLastYearEnd])
            ->first();

        $revenueThisMonth = (int)(($barangRevenues->this_month ?? 0) + ($pesananRevenues->this_month ?? 0) + ($servisRevenues->this_month ?? 0));
        $revenueLastMonth = (int)(($barangRevenues->last_month ?? 0) + ($pesananRevenues->last_month ?? 0) + ($servisRevenues->last_month ?? 0));
        $revenueSameMonthLastYear = (int)(($barangRevenues->same_month_ly ?? 0) + ($pesananRevenues->same_month_ly ?? 0) + ($servisRevenues->same_month_ly ?? 0));

        $revenueChangePercent = $revenueLastMonth > 0
            ? round((($revenueThisMonth - $revenueLastMonth) / $revenueLastMonth) * 100, 1)
            : 0;

        $oneYearGrowth = $revenueSameMonthLastYear > 0
            ? round((($revenueThisMonth - $revenueSameMonthLastYear) / $revenueSameMonthLastYear) * 100, 1)
            : 0;

        // ── Peak Revenue Period (optimized: 1 query per tabel) ──────────
        $peak = $this->getPeakPeriod($nowLocal);

        return [
            'totalRevenue'        => $revenueThisMonth,
            'revenueChangePercent'=> $revenueChangePercent,
            'oneYearGrowth'       => $oneYearGrowth,
            'peakPeriod'          => $peak['label'],
            'peakRevenue'         => $peak['revenue'],
        ];
    }

    /**
     * Cari bulan/kuartal dengan pendapatan tertinggi (rolling 2 tahun).
     * Dioptimasi: 3 query total (1 per tabel) dengan GROUP BY bulan.
     */
    private function getPeakPeriod(Carbon $nowLocal): array
    {
        $scanStart = $nowLocal->copy()->startOfMonth()->subYears(2)->setTimezone('UTC')->toDateTimeString();
        $scanEnd   = $nowLocal->copy()->endOfMonth()->setTimezone('UTC')->toDateTimeString();

        // Barang revenue per bulan (1 query)
        $barangMonthly = DB::table('aktivitas_barang')
            ->where('jenis', 'jual')
            ->whereBetween('tanggal', [$scanStart, $scanEnd])
            ->selectRaw("EXTRACT(YEAR FROM tanggal AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta') as yr,
                          EXTRACT(MONTH FROM tanggal AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta') as mo,
                          COALESCE(SUM(pendapatan), 0) as rev")
            ->groupByRaw("yr, mo")
            ->get()
            ->keyBy(fn($r) => $r->yr . '-' . $r->mo);

        // Pesanan revenue per bulan (1 query)
        $pesananMonthly = DB::table('pesanan')
            ->whereNotNull('tanggalterkirim')
            ->whereBetween('tanggalterkirim', [$scanStart, $scanEnd])
            ->selectRaw("EXTRACT(YEAR FROM tanggalterkirim AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta') as yr,
                          EXTRACT(MONTH FROM tanggalterkirim AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta') as mo,
                          COALESCE(SUM(pendapatan), 0) as rev")
            ->groupByRaw("yr, mo")
            ->get()
            ->keyBy(fn($r) => $r->yr . '-' . $r->mo);

        // Servis revenue per bulan (1 query)
        $servisMonthly = DB::table('servis')
            ->where('tanggalterkirim', '!=', '1970-01-01 00:00:00')
            ->whereNotNull('tanggalterkirim')
            ->whereBetween('tanggalterkirim', [$scanStart, $scanEnd])
            ->selectRaw("EXTRACT(YEAR FROM tanggalterkirim AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta') as yr,
                          EXTRACT(MONTH FROM tanggalterkirim AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta') as mo,
                          COALESCE(SUM(pendapatan), 0) as rev")
            ->groupByRaw("yr, mo")
            ->get()
            ->keyBy(fn($r) => $r->yr . '-' . $r->mo);

        // Gabungkan dan cari bulan puncak
        $startOfScan = $nowLocal->copy()->startOfMonth()->subYears(2);
        $bestRevenue = 0;
        $bestYear    = $startOfScan->year;
        $bestMonth   = $startOfScan->month;

        for ($i = 0; $i < 24; $i++) {
            $m = $startOfScan->copy()->addMonths($i);
            $key = ((int) $m->year) . '-' . ((int) $m->month);

            $rev = (int)($barangMonthly->get($key)->rev ?? 0)
                 + (int)($pesananMonthly->get($key)->rev ?? 0)
                 + (int)($servisMonthly->get($key)->rev ?? 0);

            if ($rev > $bestRevenue) {
                $bestRevenue = $rev;
                $bestYear    = $m->year;
                $bestMonth   = $m->month;
            }
        }

        $quarter = 'Q' . ceil($bestMonth / 3) . " '" . substr($bestYear, 2);

        return [
            'label'   => $quarter,
            'revenue' => $bestRevenue,
        ];
    }

    // =========================================================================
    //  REVENUE TREND (bar chart utama)
    // =========================================================================

    /**
     * Kembalikan array data per-periode untuk bar chart Revenue Trend.
     * Dioptimasi: 3 query total (1 per tabel) untuk semua bucket sekaligus.
     */
    private function getRevenueTrend(string $period): array
    {
        $buckets = $this->buildTimeBuckets($period);

        if (empty($buckets)) {
            return [
                'buckets'      => [],
                'maxRevenue'   => 0,
                'yAxisLabels'  => $this->buildYAxisLabels(0),
                'trendPercent' => null,
            ];
        }

        // Ambil rentang waktu terluar
        $globalFrom = $buckets[0]['from'];
        $globalTo   = $buckets[count($buckets) - 1]['to'];

        // Bulk query: ambil semua data dalam 1 rentang, lalu distribusikan ke bucket di PHP
        $barangRows = DB::table('aktivitas_barang')
            ->where('jenis', 'jual')
            ->whereBetween('tanggal', [$globalFrom, $globalTo])
            ->select('tanggal', 'pendapatan')
            ->get();

        $pesananRows = DB::table('pesanan')
            ->whereNotNull('tanggalterkirim')
            ->whereBetween('tanggalterkirim', [$globalFrom, $globalTo])
            ->select('tanggalterkirim', 'pendapatan')
            ->get();

        $servisRows = DB::table('servis')
            ->where('tanggalterkirim', '!=', '1970-01-01 00:00:00')
            ->whereNotNull('tanggalterkirim')
            ->whereBetween('tanggalterkirim', [$globalFrom, $globalTo])
            ->select('tanggalterkirim', 'pendapatan')
            ->get();

        // Distribusikan ke bucket
        $maxRevenue = 0;
        foreach ($buckets as &$bucket) {
            $revenue = 0;

            foreach ($barangRows as $row) {
                if ($row->tanggal >= $bucket['from'] && $row->tanggal <= $bucket['to']) {
                    $revenue += (int) $row->pendapatan;
                }
            }
            foreach ($pesananRows as $row) {
                if ($row->tanggalterkirim >= $bucket['from'] && $row->tanggalterkirim <= $bucket['to']) {
                    $revenue += (int) $row->pendapatan;
                }
            }
            foreach ($servisRows as $row) {
                if ($row->tanggalterkirim >= $bucket['from'] && $row->tanggalterkirim <= $bucket['to']) {
                    $revenue += (int) $row->pendapatan;
                }
            }

            $bucket['revenue'] = $revenue;
            if ($revenue > $maxRevenue) {
                $maxRevenue = $revenue;
            }
        }
        unset($bucket);

        // Hitung height_percent relatif ke nilai tertinggi (untuk rendering bar CSS)
        foreach ($buckets as &$bucket) {
            $bucket['height_percent'] = $maxRevenue > 0
                ? round(($bucket['revenue'] / $maxRevenue) * 100)
                : 0;
        }
        unset($bucket);

        // ── Trend ──
        $trendPercent = $this->calculateTrendPercent($period, $buckets, 'revenue');

        return [
            'buckets'      => $buckets,
            'maxRevenue'   => $maxRevenue,
            'yAxisLabels'  => $this->buildYAxisLabels($maxRevenue),
            'trendPercent' => $trendPercent,
        ];
    }

    /**
     * Buat bucket waktu sesuai period yang dipilih.
     * Untuk YTD/1Y/5Y → per bulan.
     * Untuk 3M → per minggu.
     * Untuk 1W/1M → per hari.
     * Untuk 1D → per jam (hourly).
     */
    private function buildTimeBuckets(string $period): array
    {
        $nowLocal = Carbon::now('Asia/Jakarta');
        $buckets  = [];

        switch ($period) {
            case '1D':
                for ($h = 7; $h <= 17; $h++) {
                    $fromLocal = $nowLocal->copy()->startOfDay()->addHours($h);
                    $toLocal   = $fromLocal->copy()->addHour()->subSecond();
                    $buckets[] = [
                        'label' => $fromLocal->format('H:i'),
                        'from'  => $fromLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                        'to'    => $toLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                    ];
                }
                break;

            case '1W':
                for ($d = 6; $d >= 0; $d--) {
                    $fromLocal = $nowLocal->copy()->subDays($d)->startOfDay();
                    $toLocal   = $fromLocal->copy()->endOfDay();
                    $buckets[] = [
                        'label' => $fromLocal->format('D'),
                        'from'  => $fromLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                        'to'    => $toLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                    ];
                }
                break;

            case '1M':
                for ($d = 29; $d >= 0; $d--) {
                    $fromLocal = $nowLocal->copy()->subDays($d)->startOfDay();
                    $toLocal   = $fromLocal->copy()->endOfDay();
                    $buckets[] = [
                        'label' => $fromLocal->format('d'),
                        'from'  => $fromLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                        'to'    => $toLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                    ];
                }
                break;

            case '3M':
                $startLocal = $nowLocal->copy()->startOfMonth()->subMonths(3)->startOfWeek();
                $weekLocal  = $startLocal->copy();
                while ($weekLocal->lte($nowLocal)) {
                    $fromLocal = $weekLocal->copy()->startOfWeek();
                    $toLocal   = $weekLocal->copy()->endOfWeek();
                    $buckets[] = [
                        'label' => $fromLocal->format('d/M'),
                        'from'  => $fromLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                        'to'    => $toLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                    ];
                    $weekLocal->addWeek();
                }
                break;

            case '1Y':
                for ($m = 12; $m >= 0; $m--) {
                    $fromLocal = $nowLocal->copy()->startOfMonth()->subMonths($m);
                    $toLocal   = $fromLocal->copy()->endOfMonth();
                    $buckets[] = [
                        'label' => strtoupper($fromLocal->format('M')),
                        'from'  => $fromLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                        'to'    => $toLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                    ];
                }
                break;

            case '5Y':
                for ($y = 5; $y >= 0; $y--) {
                    $fromLocal = $nowLocal->copy()->subYears($y)->startOfYear();
                    $toLocal   = $fromLocal->copy()->endOfYear();
                    $buckets[] = [
                        'label' => $fromLocal->format('Y'),
                        'from'  => $fromLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                        'to'    => $toLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                    ];
                }
                break;

            // YTD (default)
            default:
                $startOfYearLocal = Carbon::create($nowLocal->year, 1, 1, 0, 0, 0, 'Asia/Jakarta')->startOfMonth();
                for ($m = 0; $m < $nowLocal->month; $m++) {
                    $fromLocal = $startOfYearLocal->copy()->addMonths($m);
                    $toLocal   = $fromLocal->copy()->endOfMonth();
                    $buckets[] = [
                        'label' => strtoupper($fromLocal->format('M')),
                        'from'  => $fromLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                        'to'    => $toLocal->copy()->setTimezone('UTC')->toDateTimeString(),
                    ];
                }
                break;
        }

        return $buckets;
    }

    /**
     * Buat 5 label Y-axis (dari 0 sampai max) dalam format IDR singkat.
     */
    private function buildYAxisLabels(int $maxRevenue): array
    {
        if ($maxRevenue === 0) {
            return ['2,000M', '1,500M', '1,000M', '500M', '0'];
        }

        $labels = [];
        for ($i = 4; $i >= 0; $i--) {
            $value = ($maxRevenue / 4) * $i;
            $labels[] = $this->formatRevenueLabelShort((int) $value);
        }
        return $labels;
    }

    /** Format angka jadi "850M", "1.2B", "2,500M" dsb. */
    private function formatRevenueLabelShort(int $value): string
    {
        if ($value === 0) return '0';
        if ($value >= 1_000_000_000) {
            return number_format($value / 1_000_000_000, 1) . 'B';
        }
        return number_format($value / 1_000_000, 0, '.', ',') . 'M';
    }

    // =========================================================================
    //  REVENUE BY CATEGORY (bahan)
    // =========================================================================

    /**
     * Pendapatan dikelompokkan berdasarkan sumber: Terjual, Pesanan, Servis.
     * Format: [ ['kategori' => 'Terjual', 'revenue' => ..., 'percent' => 45], ... ]
     */
    private function getRevenueByCategory(): array
    {
        // Pendapatan dari penjualan barang (jenis = jual)
        $terjual = (int) AktivitasBarang::where('jenis', 'jual')->sum('pendapatan');

        // Pendapatan dari pesanan selesai (tanggalterkirim not null)
        $pesanan = (int) Pesanan::whereNotNull('tanggalterkirim')->sum('pendapatan');

        // Pendapatan dari servis selesai (tanggalterkirim != sentinel)
        $servis = (int) Servis::where('tanggalterkirim', '!=', '1970-01-01 00:00:00')
            ->whereNotNull('tanggalterkirim')
            ->sum('pendapatan');

        $totalAll = $terjual + $pesanan + $servis;

        $sources = [
            ['kategori' => 'Terjual', 'revenue' => $terjual],
            ['kategori' => 'Pesanan', 'revenue' => $pesanan],
            ['kategori' => 'Servis',  'revenue' => $servis],
        ];

        // Hitung persentase dan urutkan dari terbesar
        $result = collect($sources)->map(function ($item) use ($totalAll) {
            $item['percent'] = $totalAll > 0
                ? round(($item['revenue'] / $totalAll) * 100, 2)
                : 0;
            return $item;
        })->sortByDesc('revenue')->values()->toArray();

        return $result;
    }

    // =========================================================================
    //  TOP STOK & TOP TERJUAL
    // =========================================================================

    /**
     * Top 10 barang berdasarkan stok terbanyak saat ini.
     */
    private function getTopStok(int $limit = 10): array
    {
        $items = Barang::orderByDesc('jumlah')
            ->limit($limit)
            ->get(['nama', 'jumlah']);

        $max = $items->first()?->jumlah ?? 1;

        return $items->map(function ($item) use ($max) {
            return [
                'nama'           => $item->nama,
                'jumlah'         => $item->jumlah,
                'width_percent'  => $max > 0
                    ? round(($item->jumlah / $max) * 100)
                    : 0,
            ];
        })->toArray();
    }

    /**
     * Top 10 barang berdasarkan total unit terjual (dari log AktivitasBarang).
     */
    private function getTopTerjual(int $limit = 10): array
    {
        $items = AktivitasBarang::where('jenis', 'jual')
            ->select('nama_barang', DB::raw('SUM(jumlah) as total_terjual'))
            ->groupBy('nama_barang')
            ->orderByDesc('total_terjual')
            ->limit($limit)
            ->get();

        $max = $items->first()?->total_terjual ?? 1;

        return $items->map(function ($item) use ($max) {
            return [
                'nama'          => $item->nama_barang,
                'jumlah'        => (int) $item->total_terjual,
                'width_percent' => $max > 0
                    ? round(($item->total_terjual / $max) * 100)
                    : 0,
            ];
        })->toArray();
    }

    // =========================================================================
    //  PESANAN TREND & TOP PESANAN
    // =========================================================================

    /**
     * Trend jumlah pesanan per-periode (count, bukan revenue).
     * Dioptimasi: 1 query untuk semua bucket.
     */
    private function getPesananTrend(string $period): array
    {
        $buckets = $this->buildTimeBuckets($period);

        if (empty($buckets)) {
            return [
                'buckets'      => [],
                'maxCount'     => 0,
                'yAxisLabels'  => $this->buildCountYAxis(0),
                'trendPercent' => null,
            ];
        }

        $globalFrom = $buckets[0]['from'];
        $globalTo   = $buckets[count($buckets) - 1]['to'];

        // 1 query: ambil semua tanggal pesanan selesai dalam rentang
        $rows = DB::table('pesanan')
            ->whereNotNull('tanggalterkirim')
            ->whereBetween('tanggalterkirim', [$globalFrom, $globalTo])
            ->select('tanggalterkirim')
            ->get();

        $max = 0;
        foreach ($buckets as &$bucket) {
            $count = 0;
            foreach ($rows as $row) {
                if ($row->tanggalterkirim >= $bucket['from'] && $row->tanggalterkirim <= $bucket['to']) {
                    $count++;
                }
            }
            $bucket['count'] = $count;
            if ($count > $max) $max = $count;
        }
        unset($bucket);

        foreach ($buckets as &$bucket) {
            $bucket['height_percent'] = $max > 0
                ? round(($bucket['count'] / $max) * 100)
                : 0;
        }
        unset($bucket);

        $trendPercent = $this->calculateTrendPercent($period, $buckets, 'count');

        return [
            'buckets'      => $buckets,
            'maxCount'     => $max,
            'yAxisLabels'  => $this->buildCountYAxis($max),
            'trendPercent' => $trendPercent,
        ];
    }

    /**
     * Top 5 pesanan terbanyak berdasarkan nama_barang.
     */
    private function getTopPesanan(int $limit = 5): array
    {
        $items = Pesanan::select('nama_barang', DB::raw('SUM(jumlah) as total'))
            ->groupBy('nama_barang')
            ->orderByDesc('total')
            ->limit($limit)
            ->get();

        $max = $items->first()?->total ?? 1;

        return $items->map(function ($item) use ($max) {
            return [
                'nama'          => $item->nama_barang,
                'jumlah'        => (int) $item->total,
                'width_percent' => $max > 0
                    ? round(($item->total / $max) * 100)
                    : 0,
            ];
        })->toArray();
    }

    // =========================================================================
    //  SERVIS TREND & TOP SERVIS
    // =========================================================================

    /**
     * Trend jumlah servis per-periode (count).
     * Dioptimasi: 1 query untuk semua bucket.
     */
    private function getServisTrend(string $period): array
    {
        $buckets = $this->buildTimeBuckets($period);

        if (empty($buckets)) {
            return [
                'buckets'      => [],
                'maxCount'     => 0,
                'yAxisLabels'  => $this->buildCountYAxis(0),
                'trendPercent' => null,
            ];
        }

        $globalFrom = $buckets[0]['from'];
        $globalTo   = $buckets[count($buckets) - 1]['to'];

        // 1 query: ambil semua tanggal servis selesai dalam rentang
        $rows = DB::table('servis')
            ->where('tanggalterkirim', '!=', '1970-01-01 00:00:00')
            ->whereNotNull('tanggalterkirim')
            ->whereBetween('tanggalterkirim', [$globalFrom, $globalTo])
            ->select('tanggalterkirim')
            ->get();

        $max = 0;
        foreach ($buckets as &$bucket) {
            $count = 0;
            foreach ($rows as $row) {
                if ($row->tanggalterkirim >= $bucket['from'] && $row->tanggalterkirim <= $bucket['to']) {
                    $count++;
                }
            }
            $bucket['count'] = $count;
            if ($count > $max) $max = $count;
        }
        unset($bucket);

        foreach ($buckets as &$bucket) {
            $bucket['height_percent'] = $max > 0
                ? round(($bucket['count'] / $max) * 100)
                : 0;
        }
        unset($bucket);

        $trendPercent = $this->calculateTrendPercent($period, $buckets, 'count');

        return [
            'buckets'      => $buckets,
            'maxCount'     => $max,
            'yAxisLabels'  => $this->buildCountYAxis($max),
            'trendPercent' => $trendPercent,
        ];
    }

    /**
     * Top 5 servis berdasarkan nama_barang (jenis servis terpopuler).
     */
    private function getTopServis(int $limit = 5): array
    {
        $items = Servis::select('nama_barang', DB::raw('COUNT(*) as total'))
            ->groupBy('nama_barang')
            ->orderByDesc('total')
            ->limit($limit)
            ->get();

        $max = $items->first()?->total ?? 1;

        return $items->map(function ($item) use ($max) {
            return [
                'nama'          => $item->nama_barang,
                'jumlah'        => (int) $item->total,
                'width_percent' => $max > 0
                    ? round(($item->total / $max) * 100)
                    : 0,
            ];
        })->toArray();
    }

    /**
     * Hitung persentase trend.
     * Untuk 1D: membandingkan jam awal dengan jam saat ini (maksimal 100000%).
     * Untuk periode lain: membandingkan bucket pertama dengan bucket terakhir.
     */
    private function calculateTrendPercent(string $period, array $buckets, string $valueKey = 'revenue'): ?float
    {
        if (count($buckets) < 2) {
            return null;
        }

        if ($period === '1D') {
            $nowLocal = Carbon::now('Asia/Jakarta');
            $currentHour = $nowLocal->hour;

            // Batasi jam saat ini dalam rentang operasional (7 s.d. 17)
            $currHour = max(7, min(17, $currentHour));

            $currIdx = $currHour - 7;
            $firstIdx = 0;

            // Jika masih jam 7 pagi, perbandingan dengan jam awal adalah 0%
            if ($currIdx === $firstIdx) {
                return 0.0;
            }

            $currVal  = isset($buckets[$currIdx]) ? ($buckets[$currIdx][$valueKey] ?? 0) : 0;
            $firstVal = isset($buckets[$firstIdx]) ? ($buckets[$firstIdx][$valueKey] ?? 0) : 0;

            if ($firstVal > 0) {
                $percent = (($currVal - $firstVal) / $firstVal) * 100;
                return round(max(-100000, min(100000, $percent)), 2);
            } elseif ($currVal > 0) {
                return 100.0;
            } else {
                return 0.0;
            }
        }

        // Untuk periode lainnya (1W, 1M, YTD, dsb.)
        $firstVal = $buckets[0][$valueKey] ?? 0;
        $lastVal  = $buckets[count($buckets) - 1][$valueKey] ?? 0;

        if ($firstVal > 0) {
            $percent = (($lastVal - $firstVal) / $firstVal) * 100;
            return round(max(-100000, min(100000, $percent)), 2);
        } elseif ($lastVal > 0) {
            return 100.0;
        } else {
            return 0.0;
        }
    }

    /** Buat 5 label Y-axis untuk grafik berbasis count (bukan rupiah). */
    private function buildCountYAxis(int $max): array
    {
        if ($max === 0) return ['10', '7.5', '5', '2.5', '0'];

        $labels = [];
        for ($i = 4; $i >= 0; $i--) {
            $value    = ($max / 4) * $i;
            $labels[] = $value >= 1000
                ? number_format($value / 1000, 1) . 'K'
                : (string) round($value);
        }
        return $labels;
    }
}