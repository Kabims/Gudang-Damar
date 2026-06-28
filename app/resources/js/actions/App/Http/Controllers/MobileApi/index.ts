import AuthMobileApiController from './AuthMobileApiController'
import BarangMobileApiController from './BarangMobileApiController'
import AktivitasMobileApiController from './AktivitasMobileApiController'
import PesananMobileApiController from './PesananMobileApiController'
import ServisMobileApiController from './ServisMobileApiController'
import ImageMobileApiController from './ImageMobileApiController'
const MobileApi = {
    AuthMobileApiController: Object.assign(AuthMobileApiController, AuthMobileApiController),
BarangMobileApiController: Object.assign(BarangMobileApiController, BarangMobileApiController),
AktivitasMobileApiController: Object.assign(AktivitasMobileApiController, AktivitasMobileApiController),
PesananMobileApiController: Object.assign(PesananMobileApiController, PesananMobileApiController),
ServisMobileApiController: Object.assign(ServisMobileApiController, ServisMobileApiController),
ImageMobileApiController: Object.assign(ImageMobileApiController, ImageMobileApiController),
}

export default MobileApi