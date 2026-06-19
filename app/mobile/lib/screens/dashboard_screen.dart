import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Performa Pendapatan"),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _SummaryCards(),
            _PendapatanSection(),
            _StokBarangSection(),
            _PesananSection(),
            _ServisSection(),
          ],
        ),
      ),
    );
  }
}

class _SummaryCards extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Text("Summary"),
    );
  }
}

class _PendapatanSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class _StokBarangSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class _PesananSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class _ServisSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
