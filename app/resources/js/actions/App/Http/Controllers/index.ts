import DashboardController from './DashboardController'
import BarangController from './BarangController'
import ServisController from './ServisController'
import PesananController from './PesananController'
import ImageController from './ImageController'
import GrafikController from './GrafikController'
import AktivitasController from './AktivitasController'
import Auth from './Auth'
import Settings from './Settings'
import MobileApi from './MobileApi'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
BarangController: Object.assign(BarangController, BarangController),
ServisController: Object.assign(ServisController, ServisController),
PesananController: Object.assign(PesananController, PesananController),
ImageController: Object.assign(ImageController, ImageController),
GrafikController: Object.assign(GrafikController, GrafikController),
AktivitasController: Object.assign(AktivitasController, AktivitasController),
Auth: Object.assign(Auth, Auth),
Settings: Object.assign(Settings, Settings),
MobileApi: Object.assign(MobileApi, MobileApi),
}

export default Controllers