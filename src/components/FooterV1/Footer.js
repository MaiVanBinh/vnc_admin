import React, {Component} from 'react';
import './Footer.css';
class Footer extends Component {
	render(){
		return (
            <div class="footer">
                <div class="container container-footer">
                    <div class="footer-left">
                        <h4>Liên hệ</h4>
                        <p><i class="fas fa-phone"></i> 0967607690</p>
                        <p><i class="fas fa-envelope"></i> maivanbinh1321999@gmail.com</p>
                    </div>
                    <div class="footer-right">
                        <p>
                            Mọi chi tiết xin liên hệ Admin website <span>Sinh vật rừng Việt Nam</span>.<br></br>©Ghi rõ nguồn <span>Sinh vật rừng Việt Nam</span> khi bạn phát hành lại thông tin từ Website này.
                        </p>
			        </div>
                </div>
            </div>
		);
	}
}
export default Footer;