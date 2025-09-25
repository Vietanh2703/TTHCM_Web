import React, { useEffect, useState } from "react";
import "./AdBlockDetector.css";

const AdBlockDetector: React.FC = () => {
    const [isAdBlockDetected, setIsAdBlockDetected] = useState(false);

    useEffect(() => {
        let timeoutId: number;

        const detectAdBlock = () => {
            // --- Method 1: Fake "ads" element (CSS hiding) ---
            const bait = document.createElement("div");
            bait.className = "adsbox banner-ads ad-unit ad";
            bait.style.position = "absolute";
            bait.style.height = "1px";
            bait.style.width = "1px";
            bait.style.top = "-1000px";
            document.body.appendChild(bait);

            timeoutId = window.setTimeout(() => {
                const style = window.getComputedStyle(bait);
                const blocked =
                    bait.offsetParent === null ||
                    bait.offsetHeight === 0 ||
                    style.display === "none" ||
                    style.visibility === "hidden";

                bait.remove();

                if (blocked) {
                    setIsAdBlockDetected(true);
                }
            }, 200);

            // --- Method 2: Try loading a dummy "ads.js" file (request blocking) ---
            const testScript = document.createElement("script");
            testScript.src = '/bait.js'; // file nằm trong public/
            testScript.async = true;

            testScript.onerror = () => {
                setIsAdBlockDetected(true);
            };

            document.body.appendChild(testScript);
        };

        detectAdBlock();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    if (!isAdBlockDetected) return null;

    return (
        <div className="adblock-modal-overlay">
            <div className="adblock-modal">
                <div className="adblock-modal-header">
                    <h2>AdBlock được phát hiện</h2>
                </div>

                <div className="adblock-modal-body">
                    <p>
                        Vui lòng tắt AdBlock để hỗ trợ trang web này hoạt động đầy đủ và tốt
                        nhất.(Chỉ mục đích thu thập số lượng truy cập, không vì mục đích thu thập thông tin cá nhân hay tổ chức nào)
                    </p>

                    <div className="adblock-instructions">
                        <h3>Cách tắt AdBlock:</h3>
                        <ol>
                            <li>Nhấp vào biểu tượng AdBlock/uBlock trên thanh công cụ</li>
                            <li>Chọn "Tạm dừng trên trang này" hoặc "Disable on this site"</li>
                            <li>Tải lại trang</li>
                        </ol>
                    </div>
                </div>

                <div className="adblock-modal-footer">
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                    >
                        Tải lại trang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdBlockDetector;
