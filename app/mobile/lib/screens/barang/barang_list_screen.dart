import 'package:flutter/material.dart';
import '../../models/barang.dart';
import '../../services/barang_service.dart';
import '../../widgets/shared.dart';
import 'barang_tambah_sheet.dart';
import '../riwayat_aktivitas_screen.dart';

class BarangListScreen extends StatefulWidget {
  const BarangListScreen({super.key});

  @override
  State<BarangListScreen> createState() => _BarangListScreenState();
}

class _BarangListScreenState extends State<BarangListScreen> {
  final _service = BarangService();
  List<Barang> _barangList = [];
  bool _isLoading = true;
  String _searchQuery = '';
  String _currentSort = 'Nama (A-Z)';
  final _searchController = TextEditingController();
  int _currentPage = 1;
  final int _itemsPerPage = 20;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    setState(() => _isLoading = true);
    try {
      final data = await _service.getAll(search: _searchQuery);
      if (mounted) {
        setState(() {
          _barangList = data;
          _applySorting();
          _currentPage = 1;
        });
      }
    } catch (e) {
      if (mounted) showError(context, e.toString());
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _applySorting() {
    if (_currentSort == 'Nama (A-Z)') {
      _barangList.sort((a, b) => a.nama.toLowerCase().compareTo(b.nama.toLowerCase()));
    } else if (_currentSort == 'Harga Tertinggi') {
      _barangList.sort((a, b) => b.harga.compareTo(a.harga));
    } else if (_currentSort == 'Harga Terendah') {
      _barangList.sort((a, b) => a.harga.compareTo(b.harga));
    } else if (_currentSort == 'Stok Terendah') {
      _barangList.sort((a, b) => a.jumlah.compareTo(b.jumlah));
    } else if (_currentSort == 'Stok Tertinggi') {
      _barangList.sort((a, b) => b.jumlah.compareTo(a.jumlah));
    }
  }

  Future<void> _hapusBarang(Barang barang) async {
    final confirm = await showPremiumDeleteConfirmModal(context, barang.nama);
    if (!confirm) return;

    setState(() => _isLoading = true);
    try {
      await _service.delete(barang.idBarang);
      if (mounted) {
        showSuccess(context, 'Barang berhasil dihapus');
        _fetchData();
      }
    } catch (e) {
      if (mounted) {
        showError(context, e.toString());
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        titleSpacing: 0,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(color: const Color(0xFFE5E7EB), height: 1),
        ),
        leading: IconButton(
          icon: const Icon(Icons.menu, color: Color(0xFF475569)),
          onPressed: () {},
        ),
        title: const Text('Gudang Damar', style: TextStyle(color: Color(0xFF335C81), fontWeight: FontWeight.bold, fontSize: 20)),
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle_outlined, color: Color(0xFF94A3B8), size: 28),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Title Section
              const Text('List Barang', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
              const SizedBox(height: 4),
              const Text('Kelola data barang, pantau ketersediaan stok, dan perbarui informasi gudang secara efisien dalam satu tempat.', style: TextStyle(fontSize: 14, color: Color(0xFF64748B))),
              const SizedBox(height: 24),

              // Search Bar
              TextField(
                controller: _searchController,
                onSubmitted: (v) {
                  _searchQuery = v;
                  _fetchData();
                },
                style: const TextStyle(fontSize: 14),
                decoration: InputDecoration(
                  hintText: 'Cari barang...',
                  hintStyle: const TextStyle(color: Color(0xFF94A3B8)),
                  prefixIcon: const Icon(Icons.search, color: Color(0xFF94A3B8), size: 20),
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Color(0xFFD1D5DB))),
                  enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Color(0xFFD1D5DB))),
                  focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: const BorderSide(color: Color(0xFF335C81))),
                ),
              ),
              const SizedBox(height: 16),

              // Add Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () async {
                    final res = await showTambahBarangDialog(context);
                    if (res != null) {
                      showPremiumSuccessModal(context);
                      _fetchData();
                    }
                  },
                  icon: const Icon(Icons.add, color: Colors.white, size: 20),
                  label: const Text('Tambah Barang', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF335C81),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    elevation: 0,
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Sorting
              Row(
                children: [
                  const Text('Urutkan:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Color(0xFF64748B))),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Container(
                      height: 36,
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      decoration: BoxDecoration(
                        border: Border.all(color: const Color(0xFFD1D5DB)),
                        borderRadius: BorderRadius.circular(8),
                        color: Colors.white,
                      ),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<String>(
                          value: _currentSort,
                          isExpanded: true,
                          icon: const Icon(Icons.keyboard_arrow_down, color: Color(0xFF64748B), size: 16),
                          style: const TextStyle(fontSize: 14, color: Color(0xFF0F172A)),
                          items: ['Nama (A-Z)', 'Harga Tertinggi', 'Harga Terendah', 'Stok Tertinggi', 'Stok Terendah'].map((String value) {
                            return DropdownMenuItem<String>(
                              value: value,
                              child: Text(value),
                            );
                          }).toList(),
                          onChanged: (val) {
                            if (val != null) {
                              setState(() {
                                _currentSort = val;
                                _applySorting();
                              });
                            }
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Inventory List
              if (_isLoading)
                const Center(child: CircularProgressIndicator(color: Color(0xFF335C81)))
              else if (_barangList.isEmpty)
                const Center(child: Text('Tidak ada barang ditemukan.', style: TextStyle(color: Color(0xFF64748B))))
              else
                Builder(
                  builder: (context) {
                    final startIndex = (_currentPage - 1) * _itemsPerPage;
                    final endIndex = (startIndex + _itemsPerPage > _barangList.length)
                        ? _barangList.length
                        : startIndex + _itemsPerPage;
                    final displayedList = _barangList.sublist(startIndex, endIndex);
                    final totalPages = (_barangList.length / _itemsPerPage).ceil();

                    return Column(
                      children: [
                        ListView.separated(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: displayedList.length,
                          separatorBuilder: (ctx, i) => const SizedBox(height: 16),
                          itemBuilder: (ctx, i) {
                            final b = displayedList[i];
                            final isLowStock = b.jumlah < 5;
                            return Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: const Color(0xFFF3F4F6)),
                                boxShadow: const [
                                  BoxShadow(color: Color(0x08000000), offset: Offset(0, 1), blurRadius: 2),
                                ],
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFF3F4F6),
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Text(b.bentuk.isEmpty ? 'Umum' : b.bentuk, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Color(0xFF4B5563))),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(b.nama, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F172A), height: 1.2)),
                                  const SizedBox(height: 4),
                                  Text(rupiah(b.harga), style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Color(0xFF335C81))),
                                  const SizedBox(height: 12),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFF9FAFB),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          isLowStock ? 'Stok: ${b.jumlah} Unit (Low)' : 'Stok: ${b.jumlah} Unit',
                                          style: TextStyle(fontSize: 12, fontWeight: isLowStock ? FontWeight.bold : FontWeight.w500, color: isLowStock ? const Color(0xFFEF4444) : const Color(0xFF475569)),
                                        ),
                                        Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Material(
                                              color: Colors.transparent,
                                              child: InkWell(
                                                borderRadius: BorderRadius.circular(20),
                                                highlightColor: const Color(0xFF3B82F6).withOpacity(0.2),
                                                splashColor: const Color(0xFF3B82F6).withOpacity(0.3),
                                                onTap: () {
                                                  showModalBottomSheet(
                                                    context: context,
                                                    isScrollControlled: true,
                                                    backgroundColor: Colors.transparent,
                                                    builder: (_) => _DetailBarangSheet(barang: b),
                                                  );
                                                },
                                                child: const Padding(
                                                  padding: EdgeInsets.all(6.0),
                                                  child: Icon(Icons.remove_red_eye_outlined, size: 18, color: Color(0xFF3B82F6)),
                                                ),
                                              ),
                                            ),
                                            const SizedBox(width: 4),
                                            Material(
                                              color: Colors.transparent,
                                              child: InkWell(
                                                borderRadius: BorderRadius.circular(20),
                                                highlightColor: const Color(0xFFF59E0B).withOpacity(0.2),
                                                splashColor: const Color(0xFFF59E0B).withOpacity(0.3),
                                                onTap: () async {
                                                  final res = await showModalBottomSheet<Barang>(
                                                    context: context,
                                                    isScrollControlled: true,
                                                    backgroundColor: Colors.transparent,
                                                    builder: (_) => _EditBarangSheet(barang: b),
                                                  );
                                                  if (res != null) {
                                                    showEditSuccessModal(context);
                                                    _fetchData();
                                                  }
                                                },
                                                child: const Padding(
                                                  padding: EdgeInsets.all(6.0),
                                                  child: Icon(Icons.edit_outlined, size: 18, color: Color(0xFFF59E0B)),
                                                ),
                                              ),
                                            ),
                                            const SizedBox(width: 4),
                                            Material(
                                              color: Colors.transparent,
                                              child: InkWell(
                                                borderRadius: BorderRadius.circular(20),
                                                highlightColor: const Color(0xFFF87171).withOpacity(0.2),
                                                splashColor: const Color(0xFFF87171).withOpacity(0.3),
                                                onTap: () => _hapusBarang(b),
                                                child: const Padding(
                                                  padding: EdgeInsets.all(6.0),
                                                  child: Icon(Icons.delete_outline, size: 18, color: Color(0xFFEF4444)),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                        if (totalPages > 1) ...[
                          const SizedBox(height: 32),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  border: Border.all(color: const Color(0xFFE2E8F0)),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: IconButton(
                                  icon: const Icon(Icons.chevron_left),
                                  color: _currentPage > 1 ? const Color(0xFF335C81) : const Color(0xFFCBD5E1),
                                  onPressed: _currentPage > 1 ? () => setState(() => _currentPage--) : null,
                                ),
                              ),
                              const SizedBox(width: 16),
                              Text(
                                'Halaman $_currentPage dari $totalPages',
                                style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Color(0xFF475569)),
                              ),
                              const SizedBox(width: 16),
                              Container(
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  border: Border.all(color: const Color(0xFFE2E8F0)),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: IconButton(
                                  icon: const Icon(Icons.chevron_right),
                                  color: _currentPage < totalPages ? const Color(0xFF335C81) : const Color(0xFFCBD5E1),
                                  onPressed: _currentPage < totalPages ? () => setState(() => _currentPage++) : null,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ],
                    );
                  },
                ),

              // Footer
              const SizedBox(height: 48),
              const Center(
                child: Column(
                  children: [
                    Text('Gudang Damar', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF335C81))),
                    SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('Kebijakan Privasi', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Color(0xFF475569))),
                        SizedBox(width: 16),
                        Text('Syarat & Ketentuan', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Color(0xFF475569))),
                        SizedBox(width: 16),
                        Text('Pengiriman', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Color(0xFF475569))),
                        SizedBox(width: 16),
                        Text('FAQ', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Color(0xFF475569))),
                      ],
                    ),
                    SizedBox(height: 16),
                    Text('© 2024 Gudang Damar. Crafting\nKitchen Excellence.', textAlign: TextAlign.center, style: TextStyle(fontSize: 10, color: Color(0xFF94A3B8), height: 1.5)),
                    SizedBox(height: 32),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: Color(0xFFE5E7EB), width: 1)),
        ),
        child: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.white,
          selectedItemColor: const Color(0xFF335C81),
          unselectedItemColor: const Color(0xFF94A3B8),
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 10),
          unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w500, fontSize: 10),
          currentIndex: 0, // Inventory
          onTap: (index) {
            if (index == 3) {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (_) => const RiwayatAktivitasScreen()),
              );
            }
          },
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.grid_view, size: 24), label: 'Inventory'),
            BottomNavigationBarItem(icon: Icon(Icons.settings_outlined, size: 24), label: 'Service'),
            BottomNavigationBarItem(icon: Icon(Icons.shopping_cart_outlined, size: 24), label: 'Orders'),
            BottomNavigationBarItem(icon: Icon(Icons.insert_chart_outlined, size: 24), label: 'Activity'),
          ],
        ),
      ),
    );
  }
}

// ─── Detail Popup ─────────────────────────────────────────────────────────────
class _DetailBarangSheet extends StatelessWidget {
  final Barang barang;
  const _DetailBarangSheet({required this.barang});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(12),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(20)),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Detail Barang', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                IconButton(icon: const Icon(Icons.close), onPressed: () => Navigator.pop(context)),
              ],
            ),
            const Divider(),
            InfoRow(label: 'Nama Barang', value: barang.nama, bold: true),
            InfoRow(label: 'Guna/Merek', value: barang.gunaMerek),
            InfoRow(label: 'Kategori', value: '${barang.bentuk} - ${barang.bahan}'),
            InfoRow(label: 'Ukuran', value: '${barang.ukuran}'),
            InfoRow(label: 'Ketebalan', value: barang.ketebalan),
            const SectionDivider(title: 'Stok & Harga'),
            InfoRow(label: 'Harga Satuan', value: rupiah(barang.harga), valueColor: AppColors.success, bold: true),
            InfoRow(label: 'Stok Tersedia', value: '${barang.jumlah} Unit', valueColor: AppColors.primary, bold: true),
            InfoRow(label: 'Total Nilai Stok', value: rupiah(barang.total)),
            const SectionDivider(title: 'Statistik Penjualan'),
            InfoRow(label: 'Terjual', value: '${barang.jumlahTerjual} Unit'),
            InfoRow(label: 'Pendapatan', value: rupiah(barang.pendapatan), valueColor: AppColors.warningDark),
            const SizedBox(height: 16),
            AppButton(
              label: 'Tutup',
              onPressed: () => Navigator.pop(context),
              color: AppColors.border,
              textColor: AppColors.textSecondary,
              width: double.infinity,
            )
          ],
        ),
      ),
    );
  }
}

// ─── Edit Popup ─────────────────────────────────────────────────────────────
class _EditBarangSheet extends StatefulWidget {
  final Barang barang;
  const _EditBarangSheet({required this.barang});

  @override
  State<_EditBarangSheet> createState() => _EditBarangSheetState();
}

class _EditBarangSheetState extends State<_EditBarangSheet> {
  final _service = BarangService();
  bool _loading = false;

  late final TextEditingController _nama;
  late final TextEditingController _merek;
  late final TextEditingController _ukuran;
  late final TextEditingController _ketebalan;
  late final TextEditingController _bentuk;
  late final TextEditingController _bahan;
  late final TextEditingController _harga;
  late final TextEditingController _jumlah;

  String? _namaError;
  String? _merekError;
  String? _ukuranError;
  String? _ketebalanError;
  String? _bentukError;
  String? _bahanError;
  String? _hargaError;
  String? _jumlahError;

  @override
  void initState() {
    super.initState();
    final b = widget.barang;
    _nama = TextEditingController(text: b.nama);
    _merek = TextEditingController(text: b.gunaMerek);
    _ukuran = TextEditingController(text: b.ukuran.toString());
    _ketebalan = TextEditingController(text: b.ketebalan);
    _bentuk = TextEditingController(text: b.bentuk);
    _bahan = TextEditingController(text: b.bahan);
    _harga = TextEditingController(text: b.harga.toString());
    _jumlah = TextEditingController(text: b.jumlah.toString());
  }

  @override
  void dispose() {
    for (final c in [_nama, _merek, _ukuran, _ketebalan, _bentuk, _bahan, _harga, _jumlah]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() {
      _namaError = _nama.text.trim().isEmpty ? 'Wajib diisi ya ganteng' : null;
      _merekError = _merek.text.trim().isEmpty ? 'Wajib diisi' : null;
      _ukuranError = _ukuran.text.trim().isEmpty ? 'Wajib diisi' : null;
      _ketebalanError = _ketebalan.text.trim().isEmpty ? 'Wajib diisi' : null;
      _bentukError = _bentuk.text.trim().isEmpty ? 'Wajib diisi' : null;
      _bahanError = _bahan.text.trim().isEmpty ? 'Wajib diisi' : null;
      _hargaError = _harga.text.trim().isEmpty ? 'Wajib diisi' : null;
      _jumlahError = _jumlah.text.trim().isEmpty ? 'Wajib diisi' : null;
    });

    if (_namaError != null ||
        _merekError != null ||
        _ukuranError != null ||
        _ketebalanError != null ||
        _bentukError != null ||
        _bahanError != null ||
        _hargaError != null ||
        _jumlahError != null) {
      return;
    }
    setState(() => _loading = true);
    try {
      final updated = await _service.update(
        widget.barang.idBarang,
        nama: _nama.text.trim(),
        gunaMerek: _merek.text.trim(),
        ukuran: int.tryParse(_ukuran.text) ?? 0,
        ketebalan: _ketebalan.text.trim(),
        bentuk: _bentuk.text.trim(),
        bahan: _bahan.text.trim(),
        harga: int.tryParse(_harga.text) ?? 0,
        jumlah: int.tryParse(_jumlah.text) ?? 0,
      );
      if (mounted) Navigator.pop(context, updated);
    } catch (e) {
      if (mounted) showError(context, e.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final bottom = MediaQuery.of(context).viewInsets.bottom;
    return LoadingOverlay(
      isLoading: _loading,
      child: Container(
        margin: const EdgeInsets.all(12),
        padding: EdgeInsets.only(left: 20, right: 20, top: 20, bottom: bottom + 20),
        decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(20)),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Edit Barang', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
                  IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.close)),
                ],
              ),
              const SizedBox(height: 16),
              AppTextField(label: 'Nama Barang', controller: _nama, errorText: _namaError),
              const SizedBox(height: 12),
              AppTextField(label: 'Merek / Guna', controller: _merek, errorText: _merekError),
              const SizedBox(height: 16),
              const SectionDivider(title: 'Harga & Stok'),
              Row(children: [
                Expanded(child: AppTextField(label: 'Harga (Rp)', controller: _harga, isNumber: true, errorText: _hargaError)),
                const SizedBox(width: 12),
                Expanded(child: AppTextField(label: 'Jumlah', controller: _jumlah, isNumber: true, errorText: _jumlahError)),
              ]),
              const SizedBox(height: 16),
              const SectionDivider(title: 'Kategori'),
              Row(children: [
                Expanded(child: AppTextField(label: 'Ukuran', controller: _ukuran, isNumber: true, errorText: _ukuranError)),
                const SizedBox(width: 12),
                Expanded(child: AppTextField(label: 'Bentuk', controller: _bentuk, errorText: _bentukError)),
              ]),
              const SizedBox(height: 12),
              Row(children: [
                Expanded(child: AppTextField(label: 'Ketebalan', controller: _ketebalan, errorText: _ketebalanError)),
                const SizedBox(width: 12),
                Expanded(child: AppTextField(label: 'Bahan', controller: _bahan, errorText: _bahanError)),
              ]),
              const SizedBox(height: 24),
              Row(children: [
                Expanded(child: AppButton(label: 'Update', onPressed: _submit, icon: Icons.save, width: double.infinity)),
                const SizedBox(width: 10),
                Expanded(child: AppButton(label: 'Batal', onPressed: () => Navigator.pop(context), color: AppColors.border, textColor: AppColors.textSecondary, width: double.infinity)),
              ]),
            ],
          ),
        ),
      ),
    );
  }
}
