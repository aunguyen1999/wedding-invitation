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
    desc: "Một chàng trai Drupal Developer yêu code và yêu vợ. Sở thích là build những thứ hay ho bằng Docker và ngắm nhìn hoàng hôn trên bãi biển.",
    photo: getR2ImageUrl('groom.webp'),
  },
  bride: {
    name: "Kim Yến",
    desc: "Cô gái Manual Tester luôn tỉ mỉ trong từng chi tiết. Thích du lịch, chụp ảnh và là mảnh ghép hoàn hảo nhất trong cuộc đời của Aun.",
    photo: getR2ImageUrl('bride.webp'),
  }
};

export const stories = [
  {
    title: "Lần đầu gặp gỡ - 2021",
    seed: "first-meet",
    content: "Chẳng phải tiếng sét ái tình, chỉ là một buổi chiều code bug mệt nhoài, mình vô tình đưa cho Thảo một cốc cafe. Ánh mắt ấy làm mình quên luôn lỗi 500 đang chờ fix.",
    reverse: false
  },
  {
    title: "Chuyến đi đầu tiên - 2022",
    seed: "travel-da-lat",
    content: "Đà Lạt năm ấy lạnh tê tái, nhưng cái nắm tay đầu tiên đã sưởi ấm tất cả. Chúng mình nhận ra, đi đâu không quan trọng, quan trọng là đi cùng ai.",
    reverse: true
  },
  {
    title: "Lời cầu hôn bất ngờ - 2025",
    seed: "proposal",
    content: "Giữa bãi biển lúc hoàng hôn, mình đã quỳ xuống và hỏi: 'Thảo có muốn cùng Anh fix bug cuộc đời này mãi mãi không?'. Và cô ấy đã say YES!",
    reverse: false
  }
];

export const milestones = [
  {
    date: "12 / 2021",
    title: "Lần Đầu Gặp Gỡ",
    desc: "Tại buổi Workshop về Drupal, mình bị thu hút bởi cô gái Manual Tester đang chăm chú report bug."
  },
  {
    date: "02 / 2022",
    title: "Lời Tỏ Tình Ngọt Ngào",
    desc: "Đúng ngày Valentine, chúng mình chính thức trở thành một cặp dưới ánh đèn lung linh của Sài Gòn."
  },
  {
    date: "05 / 2024",
    title: "Chuyến Du Lịch Xa Đầu Tiên",
    desc: "Cùng nhau chinh phục đỉnh Fansipan, hứa với nhau sẽ cùng leo qua mọi 'ngọn núi' của cuộc đời."
  },
  {
    date: "19 / 07 / 2026",
    title: "Lễ Thành Hôn",
    desc: "Ngày mà chúng mình chính thức về chung một nhà, bắt đầu một chương mới đầy hứa hẹn."
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
    desc: "Nghi thức thành hôn trao nhẫn cưới và hẹn ước.",
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
