import './Homepage.css';
import {useState, useEffect} from "react";
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import { useChatbaseWidget } from '../hooks/useChatbaseWidget';
import type {BlogPost} from '../types/blog';


const Homepage = () => {
    useChatbaseWidget(); // Load Chatbase only on homepage

    const [selectedItem, setSelectedItem] = useState<BlogPost | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(true);
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);
    const [isImageRotated, setIsImageRotated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const galleryItems: BlogPost[] = [
        {
            id: 1,
            title: "69 Flavio Burg Suite",
            author: "Arthur Rose",
            category: "PEOPLE",
            image: image1,
            bgColor: "bg-emerald-600",
            content: `
        <p>Khám phá không gian sống hiện đại với thiết kế độc đáo tại 69 Flavio Burg Suite. Căn hộ này mang đến trải nghiệm sống đẳng cấp với kiến tr��c tinh tế và nội thất cao cấp.</p>
        
        <h3>Đặc điểm nổi bật:</h3>
        <ul>
          <li>Thiết kế open space tạo cảm giác rộng r��i</li>
          <li>Tầm nhìn panorama ra thành phố</li>
          <li>Nội thất cao cấp imported từ châu Âu</li>
          <li>Hệ thống smart home hiện đại</li>
        </ul>
        
        <p>Được thiết kế bởi kiến trúc sư Arthur Rose, căn hộ này là sự kết hợp hoàn hảo giữa phong cách minimalist và luxury living. Mỗi chi tiết đều được chăm chút kỹ lưỡng để tạo nên một không gian sống lý tưởng.</p>
      `,
            date: "March 15, 2024",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Mountain Adventures",
            author: "Sarah Chen",
            category: "NATURE",
            image: image2,
            bgColor: "bg-slate-700",
            content: `
        <p>Hành trình khám phá nh��ng đỉnh núi hùng vĩ và những cảnh quan thiên nhiên tuyệt đẹp. Trải nghiệm mạo hiểm đầy thú vị với những thử thách đầy hấp dẫn.</p>
        
        <h3>Hành trình khám phá:</h3>
        <ul>
          <li>Trekking qua các con đường mòn cổ xưa</li>
          <li>Cắm trại dưới bầu trời sao đêm</li>
          <li>Chinh phục các đỉnh núi cao</li>
          <li>Khám phá động vật hoang dã</li>
        </ul>
        
        <p>Được dẫn dắt bởi photographer Sarah Chen, chuyến phiêu lưu này sẽ mang đ��n cho bạn những trải nghiệm không thể quên và những bức ảnh đẹp nhất về thiên nhiên hoang dã.</p>
      `,
            date: "March 10, 2024",
            readTime: "8 min read"
        },
        {
            id: 3,
            title: "Urban Explorations",
            author: "Mike Johnson",
            category: "ARCHITECTURE",
            image: image1,
            bgColor: "bg-amber-600",
            content: `
        <p>Khám phá vẻ đẹp kiến trúc đô thị hiện đại qua lăng kính nghệ thu���t. Những tòa nhà chọc trời, cầu đường và không gian công cộng tạo nên bức tranh đô thị đầy màu sắc.</p>
        
        <h3>Điểm nhấn kiến trúc:</h3>
        <ul>
          <li>Các tòa nhà biểu tượng của thành phố</li>
          <li>Thi���t kế công trình công cộng sáng tạo</li>
          <li>Sự kết hợp giữa cổ điển và hiện đại</li>
          <li>Không gian xanh trong lòng đô thị</li>
        </ul>
        
        <p>Qua góc nhìn của kiến trúc sư Mike Johnson, chúng ta sẽ hiểu rõ hơn về cách thức các công trình kiến trúc �����nh hình nên diện mạo và linh hồn của một thành phố hiện đại.</p>
      `,
            date: "March 8, 2024",
            readTime: "6 min read"
        },
        {
            id: 4,
            title: "Ocean Depths",
            author: "Lisa Park",
            category: "UNDERWATER",
            image: image2,
            bgColor: "bg-blue-700",
            content: `
        <p>L��n sâu vào th��� giới dưới nước bí ẩn và khám phá những sinh vật biển kỳ di��u. Một cuộc phiêu lưu dưới đại dư��ng xanh thẳm đầy màu sắc và sự sống.</p>
        
        <h3>Khám phá đại dương:</h3>
        <ul>
          <li>Rạn san hô đầy màu sắc</li>
          <li>Các loài cá nhiệt đới quý hiếm</li>
          <li>Hang động dưới nước bí ẩn</li>
          <li>Hệ sinh thái biển đa dạng</li>
        </ul>
        
        <p>Nhiếp ảnh gia dưới nước Lisa Park sẽ dẫn dắt chúng ta khám phá những vùng biển sâu chưa được khám phá, nơi ẩn chứa những bí mật tuyệt vời của đại dương.</p>
      `,
            date: "March 5, 2024",
            readTime: "7 min read"
        },
        {
            id: 5,
            title: "Desert Landscapes",
            author: "Tom Wilson",
            category: "TRAVEL",
            image: image1,
            bgColor: "bg-orange-600",
            content: `
        <p>Hành trình qua những sa mạc rộng lớn và khám phá vẻ đẹp hoang sơ của thi��n nhiên. Những cồn cát vàng, hoàng hôn rực rỡ và bầu trời đêm đầy sao.</p>
        
        <h3>Trải nghiệm sa mạc:</h3>
        <ul>
          <li>Cưỡi lạc đà qua các cồn cát</li>
          <li>Cắm trại dưới bầu trời sao</li>
          <li>Khám phá các ốc đảo xanh mướt</li>
          <li>Tìm hiểu văn hóa du mục</li>
        </ul>
        
        <p>Cùng travel blogger Tom Wilson, chúng ta sẽ khám phá những vẻ đẹp ẩn giấu trong lòng sa mạc và học cách tìm thấy sự bình yên trong những không gian rộng lớn nhất thế giới.</p>
      `,
            date: "March 2, 2024",
            readTime: "9 min read"
        },
        {
            id: 6,
            title: "City Nights",
            author: "Emma Davis",
            category: "STREET",
            image: image1,
            bgColor: "bg-purple-700",
            content: `
        <p>Khám phá nhịp sống về đêm của thành phố qua những ánh đèn neon rực rỡ và những con phố tấp nập. Thế giới đêm với những câu chuyện riêng đầy hấp dẫn.</p>
        
        <h3>Cuộc sống đêm thành ph���:</h3>
        <ul>
          <li>Những con phố ánh đèn rực rỡ</li>
          <li>Các quán café đêm ấm cúng</li>
          <li>Nghệ thuật đư���ng phố sống động</li>
          <li>Những câu chuyện thú vị của người dân đêm</li>
        </ul>
        
        <p>Street photographer Emma Davis sẽ đưa chúng ta vào cuộc hành trình khám phá một thành phố hoàn toàn khác biệt khi màn đêm buông xuống, nơi mà những câu chuyện thú vị nhất được kể.</p>
      `,
            date: "February 28, 2024",
            readTime: "4 min read"
        }
    ];

    const handleItemClick = (item: BlogPost) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    // Check if a device is mobile
    const checkMobile = () => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        return mobile;
    };

    // Handle window resize
    useEffect(() => {
        checkMobile();
        const handleResize = () => checkMobile();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closePopup = () => {
        setIsPopupOpen(false);
        setIsContentVisible(true);
        setIsImageFullscreen(false);
        setIsImageRotated(false); // Reset rotation state
        setTimeout(() => setSelectedItem(null), 300);
    };

    const toggleContent = () => {
        const mobile = checkMobile();
        if (mobile) {
            setIsImageRotated(!isImageRotated);
        } else {
            setIsContentVisible(!isContentVisible);
        }
    };

    const handleImageClick = () => {
        // Check if on mobile device
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            setIsImageFullscreen(true);
        }
    };

    const closeFullscreenImage = () => {
        setIsImageFullscreen(false);
    };

    return (
        <div className="min-h-screen">

            {/* Gallery */}
            <div className="gallery-container">
                {galleryItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="gallery-item"
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        onClick={() => handleItemClick(item)}
                    >
                        {/* Overlay */}
                        <div className="gallery-overlay"></div>

                        {/* Content */}
                        <div className="gallery-content">
                            <div className="category-tag">
                                {item.category}
                            </div>

                            <div className="gallery-info">
                                <h2 className="gallery-title">
                                    {item.title}
                                </h2>

                                <div className="author-info">
                                    <div className="author-avatar">
                                        <img
                                            src={`https://i.pravatar.cc/40?img=${index + 1}`}
                                            alt={item.author}
                                            className="avatar-img"
                                        />
                                    </div>
                                    <span className="author-name">{item.author}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Modal */}
            {selectedItem && (
                <div className={`popup-overlay ${isPopupOpen ? 'popup-open' : ''}`}>
                    <div className={`popup-container ${isPopupOpen ? 'popup-slide-in' : ''}`}>
                        {/* Close Button */}
                        <button className="popup-close" onClick={closePopup}>
                            <span>✕</span>
                        </button>

                        {/* Popup Content */}
                        <div className={`popup-content ${!isContentVisible ? 'content-hidden' : ''} ${isImageRotated ? 'image-rotated-mode' : ''}`}>
                            {/* Left Side - Image */}
                            <div className="popup-image-section">
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    className={`popup-image ${isImageRotated ? 'image-rotated' : ''}`}
                                    onClick={handleImageClick}
                                />
                                <div className="popup-image-overlay">
                                    {/* Toggle Button */}
                                    <button 
                                        className="content-toggle-btn"
                                        onClick={toggleContent}
                                        title={isMobile ?
                                            (isImageRotated ? "Portrait View" : "Landscape View") :
                                            (isContentVisible ? "Hide Content" : "Show Content")
                                        }
                                    >
                                        {isMobile ?
                                            (isImageRotated ? "📱" : "📺") :
                                            (isContentVisible ? "▶" : "◀")
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Right Side - Content */}
                            <div className={`popup-text-section ${!isContentVisible ? 'content-collapsed' : ''} ${isImageRotated && isMobile ? 'content-hidden-mobile' : ''}`}>
                                <div className="popup-header">
                                    <h1 className="popup-title">{selectedItem.title}</h1>

                                    <div className="popup-meta">
                                        <div className="popup-author">
                                            <img
                                                src={`https://i.pravatar.cc/50?img=${selectedItem.id}`}
                                                alt={selectedItem.author}
                                                className="popup-author-avatar"
                                            />
                                            <div className="popup-author-info">
                                                <span className="popup-author-name">{selectedItem.author}</span>
                                                <div className="popup-post-info">
                                                    <span className="popup-date">{selectedItem.date}</span>
                                                    <span className="popup-separator">•</span>
                                                    <span className="popup-read-time">{selectedItem.readTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="popup-article-content">
                                    <div dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
                                </div>

                                {/* Action Buttons */}
                                <div className="popup-actions">
                                    <button className="action-btn action-btn-primary">
                                        <span className="action-icon">��️</span>
                                        Like
                                    </button>
                                    <button className="action-btn">
                                        <span className="action-icon">💬</span>
                                        Comment
                                    </button>
                                    <button className="action-btn">
                                        <span className="action-icon">📤</span>
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Image for Mobile */}
            {isImageFullscreen && selectedItem && (
                <div className="fullscreen-image-overlay" onClick={closeFullscreenImage}>
                    <div className="fullscreen-image-container">
                        <button className="fullscreen-close" onClick={closeFullscreenImage}>
                            ✕
                        </button>
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.title}
                            className="fullscreen-image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};


export default Homepage;
