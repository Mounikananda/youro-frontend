import React from "react";
import "../styles/Home.css";
import Benefits from '../assets/svgs/Benefits.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        const element = document.getElementById('scroll-words');
            if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            }
    }

    const Element = (props) => {
        return (
            <div className="features-sub-elements">
                <img src={props.img} alt="calendar_photo"></img>
                <p style={{color: 'var(--secondary-color)', textAlign: 'center'}}>{props.info}</p>
                <div className="explore-arrow" style={{fontSize: '16px'}} onClick={() => {(props.btn === 'Calculate your symptom score' || props.btn === 'Discover your diagnosis') && handleClick()}}>
                    <p style={{margin: '0px'}}>{props.btn}</p>
                    <span style={{fontSize: '16px'}} class="material-symbols-outlined">
                    arrow_forward_ios
                    </span>
                </div>
            </div>
        )
    }

    const Flipcard = (props) => {
        return (
            <>
                <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                    <img src={props.img} alt="Avatar" style={{width: '300px', height: '300px'}} />
                    <p className="flip-heading">DIAGNOSIS</p>
                    </div>
                    <div class="flip-card-back" style={{width: '300px',}}>
                    <p style={{wordBreak: 'break-word', whiteSpace: 'normal', padding: '20px',}}>{props.info}</p>
                    <div className="btn-filled" style={{width: 'fit-content', margin: 'auto auto 0px auto', padding: '5px 15px',}}>Calculate Symptom score</div>
                    </div>
                </div>
                </div>
            </>
        )
    }

    return (
        <>
        <div className="home-container">
            <div className="nav-bar">
                <div><h1>youro</h1></div>
                <div className="nav-bar-login">
                    <div className="btn-login" onClick={() => navigate('/login')}>Login</div>
                    <div className="btn-filled" onClick={() => navigate('/signup')}>Signup</div>
                </div>
            </div>
            <div className="hero">
                <div style={{width: "65%"}}>
                <p className="hero-heading">Your urologic wellness journey starts here</p>
                <div className="btn-neon" style={{width: 'fit-content'}} onClick={() => navigate('/signup')}>Join now</div>
                <p style={{marginTop: "30px", marginBottom: "70px"}}>1-on-1 urologic care, evidence-based clinical excellence, personalized treatments shipped to you - all from the comfort of your home.</p>
                </div>
                
            </div>
            <div className="features">
                <p style={{color: "var(--secondary-color)", fontSize: "32px", textAlign: "center", letterSpacing: "2px", lineHeight: '45px', padding: "0px 30px", marginBottom: '0px'}}>
                    Transparent pricing to make it faster, easier, and more enjoyable to meet with a urology-trained provider when you need it.</p>
                
                    <div className="explore-arrow">
                        <p>Explore Pricing</p>
                        <span class="material-symbols-outlined">
                        arrow_forward_ios
                        </span>
                    </div>
                
                
                <div className="features-sub">
                    <Element info='Same/next-day appointments over video or phone that always start on time.' btn='Book appointment' img='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ddde21132979631.61b3855f4d171.jpg'/>
                    <Element info='Symptom calculators for each diagnosis to keep you on track to reaching your peak urologic health.' btn='Calculate your symptom score' img='https://s3-prod.modernhealthcare.com/s3fs-public/TRANSFORMATION01_190229992_AR_-1_ZCXXSMFSHKJC.jpg'/>
                    <Element info='Urologic diagnoses treated by urology experts with compassion during each encounter.' btn='Discover your diagnosis' img='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ddde21132979631.61b3855f4d171.jpg'/>
                    <Element info='Diagnostic testing kits and treatments delivered directly to your door.' btn='Explore treatments' img='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ddde21132979631.61b3855f4d171.jpg'/>
                    <Element info='Conveniently-located lab services for a comprehensive evaluation every time.' btn='Explore lab services' img='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ddde21132979631.61b3855f4d171.jpg'/>

                </div>

                <div className='scroll-words' id='scroll-words'>
                    <p>Get an individualized treatment plan for</p>
                    <div>
                        <header>
                            <ul class="t">
                            <li>Infertility</li>
                            <li>Recurrent Kidney Stones</li>
                            <li>Premature Bladder</li>
                            <li>Overactive bladder</li>
                            <li>Erectile dysfunction</li>
                                </ul>
                        </header>
                    </div>
                </div>

                <div className="diagnosis">
                    <div id="container">
                        <div id="objects">
                        <Flipcard info='Infertility is defined as the failure to conceive after a year of unprotected and unrestricted intercourse. In women over 35, the period is defined as six months. Primary infertility is when a couple has never had children' img='https://drrahulyadav.com/wp-content/uploads/2020/02/9.png'/>
                        <Flipcard info='Infertility is defined as the failure to conceive after a year of unprotected and unrestricted intercourse. In women over 35, the period is defined as six months. Primary infertility is when a couple has never had children' img='https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20210415093010/ri/673/picture/2021/4/shutterstock_1170639043.jpg'/>
                        <Flipcard info='Infertility is defined as the failure to conceive after a year of unprotected and unrestricted intercourse. In women over 35, the period is defined as six months. Primary infertility is when a couple has never had children' img='https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20210415093010/ri/673/picture/2021/4/shutterstock_1170639043.jpg'/>
                        <Flipcard info='Infertility is defined as the failure to conceive after a year of unprotected and unrestricted intercourse. In women over 35, the period is defined as six months. Primary infertility is when a couple has never had children' img='https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20210415093010/ri/673/picture/2021/4/shutterstock_1170639043.jpg'/>
                        <Flipcard info='Infertility is defined as the failure to conceive after a year of unprotected and unrestricted intercourse. In women over 35, the period is defined as six months. Primary infertility is when a couple has never had children' img='https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20210415093010/ri/673/picture/2021/4/shutterstock_1170639043.jpg'/>
                        <Flipcard info='Infertility is defined as the failure to conceive after a year of unprotected and unrestricted intercourse. In women over 35, the period is defined as six months. Primary infertility is when a couple has never had children' img='https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20210415093010/ri/673/picture/2021/4/shutterstock_1170639043.jpg'/>
                        </div>
                    </div>
                </div>

                <div className="benefits">
                    <div style={{backgroundColor: 'var(--secondary-color)', fontSize: '24px', width: 'fit-content', margin: '100px auto 50px auto', fontWeight: 700, padding: '20px'}}>Membership <br />benefits you'll enjoy</div>
                    <div style={{display: 'flex', alignItems: 'center', margin: '15px auto', width:'40%'}}>
                        <img src={Benefits} alt="React Logo" style={{height: '20px'}}/>
                        <p style={{marginLeft: '30px'}}>24/7 on-demand care with Video Chat at no extra cost</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', margin: '15px auto', width:'40%'}}>
                        <img src={Benefits} alt="React Logo" style={{height: '20px'}}/>
                        <p style={{marginLeft: '30px'}}>Messaging with your provider in the app</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', margin: '15px auto', width:'40%'}}>
                        <img src={Benefits} alt="React Logo" style={{height: '20px'}}/>
                        <p style={{marginLeft: '30px'}}>In app prescription requests and renewals</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', margin: '15px auto', width:'40%'}}>
                        <img src={Benefits} alt="React Logo" style={{height: '20px'}}/>
                        <p style={{marginLeft: '30px'}}>Easy booking of same/next-day appointments in the app</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', margin: '15px auto', width:'40%'}}>
                        <img src={Benefits} alt="React Logo" style={{height: '20px'}}/>
                        <p style={{marginLeft: '30px'}}>Online access to your health summaries and care plans.</p>
                    </div>
                </div>

                <div style={{width: 'fit-content', margin: '70px auto'}}>
                    <p style={{fontSize: '24px', fontWeight: '700'}}>Take control of your urologic health anytime, anywhere with <span style={{color: 'var(--secondary-color)', }}>youro.</span></p>
                    <div className="btn-outlined" style={{margin: '0px auto'}} onClick={() => navigate('/signup')}>Join Now</div>
                </div>

                <div style={{height: '200px', backgroundColor: 'var(--secondary-color)'}}>

                </div>

            </div>
        </div>
        </>
    )
}

export default Home;