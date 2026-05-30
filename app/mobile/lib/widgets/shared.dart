import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:ui';

// ─── Color palette ────────────────────────────────────────────────────────────
class AppColors {
  static const primary = Color(0xFF3B82F6);
  static const primaryDark = Color(0xFF2563EB);
  static const success = Color(0xFF22C55E);
  static const successDark = Color(0xFF16A34A);
  static const warning = Color(0xFFF59E0B);
  static const warningDark = Color(0xFFD97706);
  static const danger = Color(0xFFEF4444);
  static const dangerDark = Color(0xFFDC2626);
  static const orange = Color(0xFFF97316);
  static const orangeDark = Color(0xFFEA580C);
  static const surface = Color(0xFFFFFFFF);
  static const background = Color(0xFFF8FAFC);
  static const border = Color(0xFFE2E8F0);
  static const textPrimary = Color(0xFF1E293B);
  static const textSecondary = Color(0xFF64748B);
  static const textMuted = Color(0xFF94A3B8);
}

// ─── Rupiah formatter ─────────────────────────────────────────────────────────
String rupiah(int n) {
  final s = n.toString();
  final buf = StringBuffer('Rp ');
  for (int i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 == 0) buf.write('.');
    buf.write(s[i]);
  }
  return buf.toString();
}

// ─── AppTextField ─────────────────────────────────────────────────────────────
class AppTextField extends StatelessWidget {
  final String label;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final String? hint;
  final bool isNumber;
  final String? errorText;

  const AppTextField({
    super.key,
    required this.label,
    required this.controller,
    this.keyboardType = TextInputType.text,
    this.hint,
    this.isNumber = false,
    this.errorText,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label,
            style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: errorText != null ? AppColors.danger : AppColors.textSecondary)),
        const SizedBox(height: 6),
        TextField(
          controller: controller,
          keyboardType: isNumber
              ? const TextInputType.numberWithOptions(decimal: false)
              : keyboardType,
          inputFormatters:
              isNumber ? [FilteringTextInputFormatter.digitsOnly] : null,
          style:
              const TextStyle(fontSize: 14, color: AppColors.textPrimary),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: const TextStyle(color: AppColors.textMuted),
            contentPadding:
                const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            filled: true,
            fillColor: AppColors.background,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: errorText != null ? AppColors.danger : AppColors.border),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: errorText != null ? AppColors.danger : AppColors.border),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide:
                  BorderSide(color: errorText != null ? AppColors.danger : AppColors.primary, width: 1.5),
            ),
          ),
        ),
        if (errorText != null)
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4),
            child: Text(errorText!, style: const TextStyle(color: AppColors.danger, fontSize: 11)),
          ),
      ],
    );
  }
}

// ─── AppButton ────────────────────────────────────────────────────────────────
class AppButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final Color color;
  final Color? textColor;
  final IconData? icon;
  final bool isLoading;
  final double? width;

  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.color = AppColors.primary,
    this.textColor,
    this.icon,
    this.isLoading = false,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: 44,
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: color,
          foregroundColor: textColor ?? Colors.white,
          elevation: 0,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        ),
        child: isLoading
            ? const SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                    strokeWidth: 2, color: Colors.white))
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (icon != null) ...[
                    Icon(icon, size: 16),
                    const SizedBox(width: 6),
                  ],
                  Text(label,
                      style: const TextStyle(
                          fontWeight: FontWeight.w600, fontSize: 14)),
                ],
              ),
      ),
    );
  }
}

// ─── InfoRow (detail rows) ────────────────────────────────────────────────────
class InfoRow extends StatelessWidget {
  final String label;
  final String value;
  final Color? valueColor;
  final bool bold;

  const InfoRow({
    super.key,
    required this.label,
    required this.value,
    this.valueColor,
    this.bold = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.background,
        border: Border.all(color: AppColors.border),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label,
              style: const TextStyle(
                  fontSize: 13,
                  color: AppColors.textSecondary,
                  fontWeight: FontWeight.w500)),
          Text(value,
              style: TextStyle(
                  fontSize: 13,
                  color: valueColor ?? AppColors.textPrimary,
                  fontWeight:
                      bold ? FontWeight.w700 : FontWeight.w600)),
        ],
      ),
    );
  }
}

// ─── Section divider ──────────────────────────────────────────────────────────
class SectionDivider extends StatelessWidget {
  final String title;
  const SectionDivider({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10, top: 4),
      child: Row(children: [
        Text(title,
            style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: AppColors.textSecondary)),
        const SizedBox(width: 8),
        const Expanded(child: Divider(color: AppColors.border, height: 1)),
      ]),
    );
  }
}

// ─── Loading overlay ──────────────────────────────────────────────────────────
class LoadingOverlay extends StatelessWidget {
  final bool isLoading;
  final Widget child;
  const LoadingOverlay(
      {super.key, required this.isLoading, required this.child});

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      child,
      if (isLoading)
        Container(
          color: Colors.black.withOpacity(0.35),
          child: const Center(
            child: CircularProgressIndicator(color: Colors.white),
          ),
        ),
    ]);
  }
}

// ─── Confirm dialog ───────────────────────────────────────────────────────────
Future<bool> showConfirmDialog(
  BuildContext context, {
  required String title,
  required String message,
  String confirmText = 'Ya, Lanjutkan',
  Color confirmColor = AppColors.danger,
}) async {
  final result = await showDialog<bool>(
    context: context,
    builder: (_) => AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: Row(children: [
        Icon(Icons.warning_amber_rounded, color: confirmColor, size: 24),
        const SizedBox(width: 8),
        Text(title,
            style: const TextStyle(
                fontSize: 16, fontWeight: FontWeight.w700)),
      ]),
      content: Text(message,
          style: const TextStyle(
              fontSize: 14, color: AppColors.textSecondary)),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context, false),
          child: const Text('Batal',
              style: TextStyle(color: AppColors.textSecondary)),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pop(context, true),
          style: ElevatedButton.styleFrom(
            backgroundColor: confirmColor,
            elevation: 0,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8)),
          ),
          child: Text(confirmText,
              style: const TextStyle(
                  color: Colors.white, fontWeight: FontWeight.w600)),
        ),
      ],
    ),
  );
  return result ?? false;
}

// ─── Success snackbar ─────────────────────────────────────────────────────────
void showSuccess(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
    content: Row(children: [
      const Icon(Icons.check_circle, color: Colors.white, size: 18),
      const SizedBox(width: 8),
      Expanded(child: Text(message, style: const TextStyle(fontSize: 13))),
    ]),
    backgroundColor: AppColors.success,
    behavior: SnackBarBehavior.floating,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    duration: const Duration(seconds: 3),
  ));
}

// ─── Error snackbar ───────────────────────────────────────────────────────────
void showError(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
    content: Row(children: [
      const Icon(Icons.error_outline, color: Colors.white, size: 18),
      const SizedBox(width: 8),
      Expanded(child: Text(message, style: const TextStyle(fontSize: 13))),
    ]),
    backgroundColor: AppColors.danger,
    behavior: SnackBarBehavior.floating,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    duration: const Duration(seconds: 3),
  ));
}

// ─── Badge chip ───────────────────────────────────────────────────────────────
class BadgeChip extends StatelessWidget {
  final String label;
  final Color color;
  const BadgeChip({super.key, required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(label,
          style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: color)),
    );
  }
}

// ─── Premium Success Modal ────────────────────────────────────────────────────
Future<void> showPremiumSuccessModal(BuildContext context) {
  return showGeneralDialog(
    context: context,
    barrierDismissible: true,
    barrierLabel: 'Dismiss',
    barrierColor: Colors.transparent, 
    transitionDuration: const Duration(milliseconds: 300),
    pageBuilder: (context, animation, secondaryAnimation) {
      return Stack(
        children: [
          // Backdrop with sophisticated blur
          Positioned.fill(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
              child: Container(
                color: const Color(0xFF335C81).withOpacity(0.1),
              ),
            ),
          ),
          // Modal Card
          Center(
            child: Material(
              color: Colors.transparent,
              child: Container(
                width: double.infinity,
                constraints: const BoxConstraints(maxWidth: 360),
                margin: const EdgeInsets.symmetric(horizontal: 24),
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.white.withOpacity(0.5)),
                  boxShadow: const [
                    BoxShadow(color: Color(0x0D000000), offset: Offset(0, 20), blurRadius: 25, spreadRadius: -5),
                    BoxShadow(color: Color(0x05000000), offset: Offset(0, 10), blurRadius: 10, spreadRadius: -5),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Premium Success Icon with Glassmorphism feel
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        // Blur glow
                        Container(
                          width: 120,
                          height: 120,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: const Color(0xFFDCFCE7).withOpacity(0.5),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFFDCFCE7).withOpacity(0.5),
                                blurRadius: 24,
                                spreadRadius: 12,
                              )
                            ],
                          ),
                        ),
                        // Inner circle
                        Container(
                          width: 80,
                          height: 80,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: const LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: [Color(0xFFF0FDF4), Color(0xFFDCFCE7)],
                            ),
                            border: Border.all(color: const Color(0xFFBBF7D0).withOpacity(0.5)),
                          ),
                          child: const Center(
                            child: Icon(Icons.check_circle_outline, color: Color(0xFF16A34A), size: 40),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    
                    // Content
                    const Text(
                      'Barang Berhasil Ditambah',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 24, 
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF0F172A),
                        letterSpacing: -0.5,
                      ),
                    ),
                    const SizedBox(height: 12),
                    
                    RichText(
                      textAlign: TextAlign.center,
                      text: const TextSpan(
                        style: TextStyle(
                          fontSize: 15,
                          color: Color(0xFF64748B),
                          height: 1.6,
                        ),
                        children: [
                          TextSpan(text: 'Item baru telah berhasil tercatat dalam database inventaris '),
                          TextSpan(
                            text: 'Gudang Damar',
                            style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF335C81)),
                          ),
                          TextSpan(text: '.'),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                    
                    // Action Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () => Navigator.pop(context),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF335C81),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          elevation: 10,
                          shadowColor: const Color(0xFF335C81).withOpacity(0.3),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: const Text(
                          'Tutup',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                    
                    // Subtle Brand Element
                    const SizedBox(height: 24),
                    Container(
                      padding: const EdgeInsets.only(top: 24),
                      decoration: const BoxDecoration(
                        border: Border(top: BorderSide(color: Color(0xFFF8FAFC))),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _buildBrandDot(),
                          const SizedBox(width: 6),
                          _buildBrandDot(),
                          const SizedBox(width: 6),
                          _buildBrandDot(),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      );
    },
    transitionBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: animation,
        child: ScaleTransition(
          scale: Tween<double>(begin: 0.95, end: 1.0).animate(CurvedAnimation(
            parent: animation,
            curve: Curves.easeOutCubic,
          )),
          child: child,
        ),
      );
    },
  );
}

Widget _buildBrandDot() {
  return Container(
    width: 6,
    height: 6,
    decoration: BoxDecoration(
      color: const Color(0xFF335C81).withOpacity(0.3),
      shape: BoxShape.circle,
    ),
  );
}

// ─── Edit Success Modal ───────────────────────────────────────────────────────
Future<void> showEditSuccessModal(BuildContext context) {
  return showGeneralDialog(
    context: context,
    barrierDismissible: true,
    barrierLabel: 'Dismiss',
    barrierColor: Colors.transparent, 
    transitionDuration: const Duration(milliseconds: 200),
    pageBuilder: (context, animation, secondaryAnimation) {
      return Stack(
        children: [
          // Backdrop
          Positioned.fill(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
              child: Container(
                color: const Color(0xFF0F172A).withOpacity(0.4),
              ),
            ),
          ),
          // Modal Card
          Center(
            child: Material(
              color: Colors.transparent,
              child: Container(
                width: double.infinity,
                constraints: const BoxConstraints(maxWidth: 360),
                margin: const EdgeInsets.symmetric(horizontal: 24),
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(32),
                  boxShadow: const [
                    BoxShadow(color: Color(0x33000000), offset: Offset(0, 20), blurRadius: 40),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Success Icon
                    Container(
                      width: 96, // w-24
                      height: 96, // h-24
                      decoration: const BoxDecoration(
                        color: Color(0xFFF0FDF4), // green-50
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Container(
                          width: 56, // w-14
                          height: 56, // h-14
                          decoration: BoxDecoration(
                            color: const Color(0xFFF0FDF4), // green-50
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF22C55E), width: 2), // green-500
                          ),
                          child: const Center(
                            child: Icon(Icons.check, color: Color(0xFF22C55E), size: 32),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),
                    
                    // Title
                    const Text(
                      'Perubahan Berhasil Disimpan',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 22, 
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF1E293B), // slate-800
                        height: 1.2,
                      ),
                    ),
                    const SizedBox(height: 12),
                    
                    // Description
                    RichText(
                      textAlign: TextAlign.center,
                      text: const TextSpan(
                        style: TextStyle(
                          fontSize: 14,
                          color: Color(0xFF64748B), // slate-500
                          height: 1.6,
                        ),
                        children: [
                          TextSpan(text: 'Data barang telah berhasil diperbarui dalam sistem '),
                          TextSpan(
                            text: 'Gudang Damar',
                            style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF334155)), // slate-700
                          ),
                          TextSpan(text: '.'),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                    
                    // Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () => Navigator.pop(context),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF335C81),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          elevation: 8,
                          shadowColor: const Color(0xFF1E3A8A).withOpacity(0.2), // blue-900/20
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: const Text(
                          'Tutup',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                        ),
                      ),
                    ),
                    
                    // Dots
                    const SizedBox(height: 32),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildEditBrandDot(),
                        const SizedBox(width: 8),
                        _buildEditBrandDot(),
                        const SizedBox(width: 8),
                        _buildEditBrandDot(),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      );
    },
    transitionBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: animation,
        child: ScaleTransition(
          scale: Tween<double>(begin: 0.9, end: 1.0).animate(CurvedAnimation(
            parent: animation,
            curve: Curves.easeOut,
          )),
          child: child,
        ),
      );
    },
  );
}

Widget _buildEditBrandDot() {
  return Container(
    width: 6,
    height: 6,
    decoration: BoxDecoration(
      color: const Color(0xFF94A3B8).withOpacity(0.2), // slate-400 with opacity 20
      shape: BoxShape.circle,
    ),
  );
}

// ─── Premium Delete Confirm Modal ─────────────────────────────────────────────
Future<bool> showPremiumDeleteConfirmModal(BuildContext context, String itemName) async {
  final result = await showGeneralDialog<bool>(
    context: context,
    barrierDismissible: true,
    barrierLabel: 'Dismiss',
    barrierColor: Colors.transparent,
    transitionDuration: const Duration(milliseconds: 300),
    pageBuilder: (context, animation, secondaryAnimation) {
      return Stack(
        children: [
          // Backdrop with sophisticated blur
          Positioned.fill(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
              child: Container(
                color: const Color(0xFF335C81).withOpacity(0.1),
              ),
            ),
          ),
          // Modal Card
          Center(
            child: Material(
              color: Colors.transparent,
              child: Container(
                width: double.infinity,
                constraints: const BoxConstraints(maxWidth: 360),
                margin: const EdgeInsets.symmetric(horizontal: 24),
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.white.withOpacity(0.5)),
                  boxShadow: const [
                    BoxShadow(color: Color(0x0D000000), offset: Offset(0, 20), blurRadius: 25, spreadRadius: -5),
                    BoxShadow(color: Color(0x05000000), offset: Offset(0, 10), blurRadius: 10, spreadRadius: -5),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Premium Warning/Delete Icon
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        // Blur glow
                        Container(
                          width: 120,
                          height: 120,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: const Color(0xFFFEE2E2).withOpacity(0.5), // red-100/50
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFFFEE2E2).withOpacity(0.5),
                                blurRadius: 24,
                                spreadRadius: 12,
                              )
                            ],
                          ),
                        ),
                        // Inner circle
                        Container(
                          width: 80,
                          height: 80,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: const LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: [Color(0xFFFEF2F2), Color(0xFFFEE2E2)], // red-50 to red-100
                            ),
                            border: Border.all(color: const Color(0xFFFECACA).withOpacity(0.5)), // red-200/50
                          ),
                          child: const Center(
                            child: Icon(Icons.delete_outline, color: Color(0xFFDC2626), size: 40), // red-600, trash can
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    
                    // Content
                    const Text(
                      'Hapus Barang?',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 24, 
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF0F172A),
                        letterSpacing: -0.5,
                      ),
                    ),
                    const SizedBox(height: 12),
                    
                    RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(
                        style: const TextStyle(
                          fontSize: 15,
                          color: Color(0xFF64748B),
                          height: 1.6,
                        ),
                        children: [
                          const TextSpan(text: 'Apakah Anda yakin ingin menghapus '),
                          TextSpan(
                            text: itemName,
                            style: const TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF335C81)),
                          ),
                          const TextSpan(text: '? Data yang dihapus tidak dapat dipulihkan.'),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                    
                    // Action Buttons (Column)
                    Column(
                      children: [
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: () => Navigator.pop(context, true),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFFDC2626), // red-600
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              elevation: 10,
                              shadowColor: const Color(0xFFDC2626).withOpacity(0.2),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: const Text(
                              'Hapus',
                              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                        const SizedBox(height: 12),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: () => Navigator.pop(context, false),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFFF3F4F6), // gray-100
                              foregroundColor: const Color(0xFF334155), // slate-700
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              elevation: 0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: const Text(
                              'Batal',
                              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                      ],
                    ),
                    
                    // Subtle Brand Element
                    const SizedBox(height: 24),
                    Container(
                      padding: const EdgeInsets.only(top: 24),
                      decoration: const BoxDecoration(
                        border: Border(top: BorderSide(color: Color(0xFFF8FAFC))),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _buildBrandDot(),
                          const SizedBox(width: 6),
                          _buildBrandDot(),
                          const SizedBox(width: 6),
                          _buildBrandDot(),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      );
    },
    transitionBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: animation,
        child: ScaleTransition(
          scale: Tween<double>(begin: 0.95, end: 1.0).animate(CurvedAnimation(
            parent: animation,
            curve: Curves.easeOutCubic,
          )),
          child: child,
        ),
      );
    },
  );
  
  return result ?? false;
}
