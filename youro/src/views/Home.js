import React, { useState } from "react";
import "../styles/Home.css";
import Benefits from '../assets/svgs/Benefits.svg';
import { useNavigate } from 'react-router-dom';
import SymptomCalculator from "./Patient UI/SymptomCalculator";

const Home = () => {

    const [open, setOpen] = useState(false);

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
                    <img src={props.img} alt="Avatar" style={{width: '100%', height: '100%'}} />
                    <p className="flip-heading" style={{textTransform: 'uppercase'}}>{props.diagName}</p>
                    </div>
                    <div class="flip-card-back" style={{width: '100%',}}>
                    <p style={{wordBreak: 'break-word', whiteSpace: 'normal', padding: '20px',color:'black', }}><i>{props.info}</i></p>
                    <div className="btn-filled" style={{width: 'fit-content', margin: 'auto auto 0px auto', padding: '5px 15px',}} onClick={() => setOpen(true)}>Calculate Symptom score</div> <br />
                    <div className="btn-outlined" style={{width: 'fit-content', margin: 'auto auto 0px auto', padding: '5px 15px',}} onClick={() => navigate('/login')}>Speak to Provider</div>
                    </div>
                </div>
                </div>
            </>
        )
    }

    return (
        <>
        <body>
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
                    <Element info='Urologic diagnoses treated by urology experts with compassion during each encounter.' btn='Discover your diagnosis' img='https://www.goodtherapy.org/blog/blog/wp-content/uploads/2012/10/doctor-with-patient.jpg'/>
                    <Element info='Diagnostic testing kits and treatments delivered directly to your door.' btn='Explore treatments' img='https://blog.healthians.com/wp-content/uploads/2020/08/983.jpg'/>
                    <Element info='Conveniently-located lab services for a comprehensive evaluation every time.' btn='Explore lab services' img='https://www.rabkindermpath.com/blog/admin/uploads/2022/man-lab-doing-experiments_laboratory_1668593536.jpg'/>

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
                        
                        <Flipcard diagName='Erectile Dysfunction' info="Difficulty in achieving or maintaining an erection when you want to is referred to as erectile dysfunction (ED). A multitude of factors may cause the intricate processes involved in achieving and maintaining an erection to become disrupted. Seeking the expertise of a urologist, a specialist in male sexual health, is essential for a thorough diagnosis and access to tailored treatment options. Don't let ED disrupt your life — take the first step toward regaining your vitality and enhancing your sex life." img='https://cdn.synappsehealth.com/res-prod/img/blog/articles/erectile_dysfunction.png'/>
                        <Flipcard diagName='Premature Ejaculation' info="Premature ejaculation (PE) is an inability to control ejaculation, leading to orgasms happening sooner than desired during sexual activity. PE is a genuine medical issue that can occur at any age, and there are effective treatments available. Speaking with a urologist, a sexual health specialist, can help diagnose the underlying causes and provide guidance on strategies and treatments to improve you and your partner's sexual performance and satisfaction — take the first step toward enhancing your sexual well-being." img='https://cdn-subot.hellohealthgroup.com/1d9208a2-0a6f-481d-ba59-144e866cbfa3.png'/>
                        <Flipcard diagName='Recurrent UTIs' info="One in four people who develop one urinary tract infection (UTI) will go on to develop frequent recurrences. These infections happen when bacteria make their way into the urinary tract, causing discomfort, frequent urination, blood in the urine, and sometimes pain. 2 UTIs in 6 months or 3 UTIs in a year qualifies as recurrent UTIs. Consulting a urologist can help identify potential underlying causes and develop a personalized plan to reduce the frequency of these infections — take the first step toward improving your urinary health and overall well-being." img='https://d1kve3ll6vvkpr.cloudfront.net/dir/media/W1siZiIsIjIwMjMvMDUvMTcvMjMvMjgvMzYvYzRmMWU4MTMtZjQ4Mi00MzRkLTg1NDUtZWU3NGRjOWEwNDA5L1VUSV8yMDIzLWhlYWRlci5qcGciXSxbInAiLCJ0aHVtYiIsIjEyNDB4NjQwIyJdLFsicCIsImVuY29kZSIsImpwZyIsIi1xdWFsaXR5IDcwIl1d/file.jpg?basename=What+to+Do+if+You+Get+a+Urinary+Tract+Infection+%28UTI%29&sha=6f92e8a67d7be82d'/>
                        <Flipcard diagName='Recurrent Kidney Stones' info="Kidney stones are hard mineral deposits that can form in your kidneys and cause intense discomfort when they travel down your urinary tract. If you've experienced kidney stones in the past, you understand the agony they can bring. Kidney stones can have long-term effects on your kidney health. A urologist, a specialist in kidney stone management, can conduct tests to identify the underlying causes and develop a personalized plan to prevent future stones — take the first step toward avoiding the pain and potential complications associated with this condition." img='https://cdn.dribbble.com/users/1808/screenshots/1203735/media/c345c88529a76b5e95faa48876bbe701.gif?resize=800x600&vertical=center'/>
                        <Flipcard diagName='Enlarged Prostate' info='As men age, the prostate gland can grow larger through a process called benign prostatic hyperplasia (BPH). This enlargement can put pressure on your urethra, the tube responsible for carrying urine from your bladder. As a result, you may experience symptoms such as increased urination frequency, especially at night, a weakened urine stream, or difficulty fully emptying your bladder. By consulting a urologist, a specialist in prostate health, you can receive a thorough diagnosis and receive tailored treatment plans — take the first step toward regaining control and improving your prostate health.' img='https://www.contemporaryobgyn.net/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0vv8moc6%2Fcontobgyn%2Fc9e37658f638ee9c1d67d55c6864947b7b9d315f-9000x3857.jpg%3Frect%3D3401%2C0%2C5599%2C3857%26fit%3Dcrop%26auto%3Dformat&w=3840&q=75'/>
                        <Flipcard diagName='Overactive Bladder' info="Overactive bladder (OAB) causes your bladder muscles to squeeze at the wrong times leading to sudden and strong urges to pee, sometimes causing you to rush to the restroom. You might even experience leakage before you can get there. By consulting a urologist, a specialist in urinary health, you can get a proper diagnosis and explore effective treatments to manage OAB symptoms. Don't let OAB control your life — take the first step towards regaining control and improving your quality of life." img='https://www.aashrayuro.com/images/overactive-bladder-01-p-500.jpg'/>
                        <Flipcard diagName='Infertility' info="Male infertility can be a significant and emotionally challenging issue for couples striving to start a family. Male infertility is a genuine medical concern, and there are specialists known as reproductive urologists who can provide expert guidance. These professionals can conduct thorough evaluations to identify the underlying causes of male infertility and recommend tailored treatments or interventions to enhance fertility. Don't let male infertility stand in the way of your dream of becoming a parent—take the first step towards seeking specialized assistance and improving your chances of building the family you desire." img='https://cdn.dribbble.com/users/1788290/screenshots/3929393/sh010_coupleloop_800x600.gif'/>
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

                <div style={{width: 'fit-content', margin: '120px auto', textAlign: 'center'}}>
                    <p style={{fontSize: '43px', fontWeight: '700'}}>Take control of your urologic health anytime, anywhere with <span style={{color: 'var(--secondary-color)', }}>youro.</span></p>
                    <div className="btn-outlined" style={{margin: '0px auto'}} onClick={() => navigate('/signup')}>Join Now</div>
                </div>

                <div style={{backgroundColor: 'var(--secondary-color)', padding: '10px 40px'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div>
                            <h1 style={{color: 'white', fontSize: '60px',}}>youro</h1>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <a href='/policy' target='_blank' style={{marginRight: '20px', textDecoration: 'underline', color: '#444'}}>Privacy Policy</a>
                            <a href='/terms-conditions' target='_blank' style={{marginRight: '20px', textDecoration: 'underline', color: '#444'}}>Terms & Conditions</a>
                            <a href='/telehealth-consent' target='_blank' style={{marginRight: '20px', textDecoration: 'underline', color: '#444'}}>Telehealth Consent</a>
                        </div>
                        <div>
                        <div class="rounded-social-buttons">
                            <a class="social-button facebook" href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                            <a class="social-button twitter" href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                            <a class="social-button linkedin" href="https://www.linkedin.com/" target="_blank"><i class="fab fa-linkedin"></i></a>
                            <a class="social-button tiktok" href="https://www.tiktok.com/" target="_blank"><i class="fab fa-tiktok"></i></a>
                            <a class="social-button youtube" href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube"></i></a>
                            <a class="social-button instagram" href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
                        </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
        </body>
        {open && <SymptomCalculator open={open} setOpen={setOpen} />}
        </>
    )
}

export default Home;