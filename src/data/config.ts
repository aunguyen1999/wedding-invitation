import { getR2ImageUrl } from '../utils/r2';

import vendorPlaceholder from '@images/vendor-placeholder.png';
import phieuStudioLogo from '@images/phieu-studio.jpg';
import abcSoundLogo from '@images/abc-sound.jpg';
import tamPhotographyLogo from '@images/tam-photography.jpg';
import vanPhongLogo from '@images/van-phong-decor.jpg';
import haiLanhLogo from '@images/hai-lanh.jpg';
import hauStudioLogo from '@images/hau-studio.jpg';
import thucNganLogo from '@images/thuc-ngan.jpg';
import kimCucLogo from '@images/kim-cuc.png';
import hongBeLogo from '@images/hong-be.jpg';
import leAnhTuanLogo from '@images/le-anh-tuan.jpg';

export const myWedding = {
  groom: "Văn Âu",
  bride: "Kim Yến",
  date: "19 . 07 . 2026",
  mainPhoto: getR2ImageUrl('groom-bride.webp'),
  slogan: "Hành trình vạn dặm bắt đầu từ một bước chân chung đôi.",
  decorImage: getR2ImageUrl('invitation-decor.webp')
};

export const weddingData = {
  groom: {
    name: "Văn Âu",
    desc: "Một chàng trai đẹp trai, hiền lành, tốt tính, yêu thương gia đình và yêu vợ.",
    photo: getR2ImageUrl('groom.webp'),
  },
  bride: {
    name: "Kim Yến",
    desc: "Một cô gái dễ thương, chu đáo và tỉ mỉ trong từng chi tiết. Luôn yêu thương gia đình và yêu chồng",
    photo: getR2ImageUrl('bride.webp'),
  }
};

export const milestones = [
  {
    date: "09 / 2016",
    title: "Lần Đầu Gặp Gỡ",
    desc: "Tại buổi kỷ niệm 40 năm thành lập trường. Với cái hè đầy nắng và gió, chúng mình đã gặp nhau."
  },
  {
    date: "01 / 2017",
    title: "Lời Tỏ Tình Ngọt Ngào",
    desc: "Chúng mình đã ngỏ lời thích và chính thức tìm hiểu nhau."
  },
  {
    date: "07 / 2017",
    title: "Hành trình yêu xa bắt đầu",
    desc: "Một quãng thời gian đầy thử thách đối với chúng mình. Anh vào Sài Gòn học tập, còn em học tập dưới mái trường ở quê. Tình yêu ngăn cách bởi địa lý nhưng vẫn chung một nhịp đập."
  },
  {
    date: "07 / 2026",
    title: "Quyết định về chung một nhà",
    desc: "Hành trình 9 năm tìm hiểu, yêu và thương. Cuối cùng chúng mình quyết định về chung một nhà."
  }
];

export const brideProgram = [
  {
    time: "09:00",
    title: "Lễ Vu Quy",
    desc: "Nghi thức bái đường gia tiên tại tư gia nhà gái.",
    icon: "ceremony",
    location: "Tư gia Nhà gái: Thôn 2 - Xã Gio Linh - Tỉnh Quảng Trị",
    mapLink: "https://goo.gl/maps/ijdbLSujMNEyvo2D8?g_st=afm"
  },
  {
    time: "10:00",
    title: "Đón Khách",
    desc: "Đón tiếp quý khách mời tại nhà hàng Trầu Cau.",
    icon: "welcome",
    location: "Nhà hàng Trầu Cau: 94 Võ Nguyên Giáp - Xã Gio Linh - Tỉnh Quảng Trị",
    mapLink: "https://maps.app.goo.gl/nGGXQsWx9MyKvK5c6"
  },
  {
    time: "11:00",
    title: "Tiệc Mừng",
    desc: "Thưởng thức tiệc cưới thân mật cùng họ nhà gái.",
    icon: "feast",
    location: "Nhà hàng Trầu Cau: 94 Võ Nguyên Giáp - Xã Gio Linh - Tỉnh Quảng Trị",
    mapLink: "https://maps.app.goo.gl/nGGXQsWx9MyKvK5c6"
  }
];

export const groomProgram = [
  {
    time: "09:00",
    title: "Lễ Thành Hôn",
    desc: "Lễ gia tiên tại tư gia nhà Nam",
    icon: "ceremony",
    location: "Tư gia Nhà nam: Thôn An Đồng - Xã Bến Hải - Tỉnh Quảng Trị",
    mapLink: "https://maps.app.goo.gl/CwLvHMvdQVjLSXfC9"
  },
  {
    time: "10:00",
    title: "Đón Khách",
    desc: "Đón tiếp khách mời tại Trung tâm học tập cộng đồng thôn An Đồng.",
    icon: "welcome",
    location: "Trung tâm học tập cộng đồng thôn An Đồng: Thôn An Đồng - Xã Bến Hải - Tỉnh Quảng Trị",
    mapLink: "https://maps.app.goo.gl/cbmtX13eAXMtw6z57"
  },
  {
    time: "11:00",
    title: "Khai Tiệc",
    desc: "Khai tiệc mừng và chúc phúc cho đôi uyên ương.",
    icon: "feast",
    location: "Trung tâm học tập cộng đồng thôn An Đồng: Thôn An Đồng - Xã Bến Hải - Tỉnh Quảng Trị",
    mapLink: "https://maps.app.goo.gl/cbmtX13eAXMtw6z57"
  }
];

export const vendorsData = [
  { role: 'Pre-Wedding', name: 'Phiêu Studio', logo: phieuStudioLogo, url: 'https://www.facebook.com/phieustudiohcm' },
  { role: 'Nhà Hàng', name: 'Nhà hàng Trầu Cau', logo: vendorPlaceholder, url: '' },
  { role: 'Ẩm Thực', name: 'Nhà hàng Kim Cúc', logo: kimCucLogo, url: 'https://www.facebook.com/kimcuc.palace.5' },
  { role: 'Ẩm Thực', name: 'Hồng Bê', logo: hongBeLogo, url: 'https://www.facebook.com/hong.be.279537' },
  { role: 'Chụp Hình', name: 'Thái Minh Tâm', logo: tamPhotographyLogo, url: 'https://www.facebook.com/taam74' },
  { role: 'Rạp Cưới', name: 'Văn Phong Decor', logo: vanPhongLogo, url: 'https://www.facebook.com/phongasd11' },
  { role: 'Rạp Cưới', name: 'Rạp Cưới Hải Lành', logo: haiLanhLogo, url: 'https://www.facebook.com/dinh2210' },
  { role: 'Âm Thanh Ánh Sáng', name: 'Âm Thanh Ánh Sáng ABC', logo: abcSoundLogo, url: 'https://www.facebook.com/linh.mai.265123' },
  { role: 'Studio', name: 'Hậu Studio', logo: hauStudioLogo, url: 'https://www.facebook.com/sakura.miny' },
  { role: 'Tráp Cưới', name: 'Thục Ngân Flower', logo: thucNganLogo, url: 'https://www.facebook.com/ngan.thuc.104'},
  { role: 'Thiệp Cưới', name: 'Lê Anh Tuấn', logo: leAnhTuanLogo, url: 'https://www.facebook.com/anhtuankt10' },
];
