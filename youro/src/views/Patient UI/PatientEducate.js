import { React, useState, useEffect } from 'react';
import Youroheader from "../Youro-header";
import { API_DETAILS } from '../../App';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const PatientEducate = (props) => {

    const [step, setStep] = useState(0);
    const [viewVal, setViewVal] = useState(0);
    const [diagnosisData, setDiagnosisData] = useState([]);
    const [pageContext, setPageContext] = useState('SYSMPTOMS');

    const educationalInfo = [
        {
            definition: `
                <p>Benign prostatic hyperplasia (BPH) occurs when there is an enlargement of the prostate and surrounding tissues. The prostate undergoes two primary growth phases during a man's life. The first phase takes place early in puberty, leading to a doubling in size. The second phase typically starts around age 25 and persists throughout most of a man's lifespan. With advancing age, the prostate may further enlarge, and BPH manifests when it reaches a size significant enough to create issues.</p>
                <br>
                <p>The expansion of the prostate exerts pressure on the urethra, resulting in a thickening of the bladder wall. As time progresses, the bladder may experience a weakening, leading to a diminished ability to empty completely. Consequently, urine retention occurs within the bladder. These developments contribute to the emergence of lower urinary tract symptoms (LUTS) associated with BPH. Understanding how BPH induces symptoms is crucial for your healthcare team in determining the appropriate type of treatment to recommend.</p>
                `,
            symptoms: `
                <p>When the prostate undergoes enlargement, it has the potential to cause irritation or obstruction in the bladder. Frequent urination represents a prevalent symptom of benign prostatic hyperplasia (BPH), often characterized by the necessity to urinate every one to two hours, particularly during nighttime.</p>
                <p>Additional manifestations of BPH encompass:</p>
                <ul>
                <li>Incomplete emptying: the sensation of a full bladder persisting even after voiding.</li>
                <li>Frequency: a frequent need to urinate, occurring approximately every one to two hours.</li>
                <li> Intermittency: the requirement to start and stop repeatedly during the urination process. </li>
                <li> Urgency: an intense and immediate urge to urinate, as if delaying is impossible. </li>
                <li> Weak stream: a diminished and feeble flow of urine. </li>
                <li> Straining: difficulties initiating urination or the necessity to exert effort to void. </li>
                <li> Nocturia: waking up more than twice during the night to urinate. </li>
                </ul>
                <p>These symptoms collectively contribute to the clinical picture of BPH, and their identification aids in the assessment and diagnosis of the condition.</p>
                `,
            causes: `
                <p>The exact causes of benign prostatic hyperplasia (BPH) remain unclear, with a predominant occurrence in older men. Hormonal shifts are implicated as potential contributors to its development.</p>
                <p>A key consideration is the role of hormones from the testes, particularly active testosterone. With aging, there is a decline in the amount of active testosterone circulating in the blood, while estrogen levels remain relatively constant. The alteration in these hormone levels is theorized to be associated with the stimulation of prostate cell growth, ultimately leading to BPH. Another hypothesis centers on the significance of dihydrotestosterone (DHT), a male hormone crucial for prostate development. Studies suggest that older men may exhibit elevated levels of DHT, coinciding with a decrease in testosterone levels. These hormonal dynamics are postulated as factors that may trigger the onset of BPH.</p>
                `,
            treatment: `
                <h4>Active Surveillance</h4>
                <p>Frequently, benign prostatic hyperplasia (BPH) can be effectively managed through a strategy known as active surveillance. This approach involves vigilant monitoring of the condition without implementing immediate active treatment, typically involving regular visits to a urologist. Routine yearly examinations are customary, during which healthcare providers assess for any deterioration or emergence of new issues before considering alternative interventions. Recommendations often include incorporating dietary and exercise measures to prevent or mitigate symptoms.</p>
                <p>Active surveillance is particularly well-suited for men experiencing mild to moderate BPH symptoms. Additionally, it serves as a viable option for individuals who are not significantly affected by the consequences of BPH, allowing for a tailored and conservative approach to the management of the condition.</p>
                <h4>Prescription Drugs</h4>
                <p>Men dealing with benign prostatic hyperplasia (BPH) may find relief through prescription drugs, and various types are available:</p>
                <ol>
                <li>Alpha blockers: These oral medications work by relaxing the muscles of the prostate and bladder, alleviating BPH symptoms. Although they don't shrink the prostate, they can enhance urine flow if there's a blockage. Alpha blockers, such as alfuzosin, doxazosin, silodosin, tamsulosin, and terazosin, offer a rapid onset of action. Side effects may include dizziness, lightheadedness, fatigue, and difficulty ejaculating. They are generally recommended for men with moderate to severe BPH symptoms or those significantly bothered by their symptoms. However, caution is advised if cataract surgery is anticipated soon.</li>
                <li>5-Alpha reductase inhibitors: These pills function by increasing urine flow and reducing prostate size through the inhibition of dihydrotestosterone (DHT), a male hormone associated with prostate growth. Medications like dutasteride and finasteride may lower the risk of BPHrelated issues and the need for surgery. Side effects may include erectile dysfunction and reduced libido, and consistent pill use is necessary to prevent symptom recurrence. This option is often suitable for men with significantly enlarged prostates.</li>
                <li>Combined therapy: This approach involves the simultaneous use of an alpha blocker and a 5-alpha reductase inhibitor, which may be more effective in preventing BPH progression than either drug alone. However, the combined use may result in increased side effects, such as dizziness, erectile dysfunction, weakness, or a drop in blood pressure upon standing. </li>
                <li>Urologists may introduce antimuscarinics for patients experiencing overactive bladder symptoms, characterized by uncontrollable bladder muscle contractions leading to frequent and urgent urination, which can potentially result in incontinence. Antimuscarinics function to relax the bladder muscles. Men with larger prostates are often considered suitable candidates for this comprehensive treatment approach. </li>
                </ol>
                <p>Possible drug combinations include:</p>
                <ul>
                <li>Finasteride and doxazosin</li>
                <li>Dutasteride and tamsulosin, available as a combined medication in a single tablet. </li>
                <li>Alpha blockers and antimuscarinics may be prescribed in certain cases.</li>
                </ul>
                `,
            surgical_options: `
                <h4>Less Invasive Surgery</h4>
                <p>Less invasive surgical treatments (MIST) or minimally invasive surgery often allow for outpatient procedures without the need for a hospital stay, resulting in quicker recovery times. These interventions can provide relief from benign prostatic hyperplasia (BPH) symptoms, including urinary control issues. It's important to note that certain MIST procedures may not necessarily reduce the risk of requiring additional surgeries or the need for medication in the future. Therefore, it is advisable to discuss retreatment rates with your urologist when considering MIST or more invasive surgical options.</p>
                <p>Men who may be good candidates for these procedures include men who have previously taken BPH medications without success or who have the following symptoms:</p>
                <ul>
                <li>Weak stream of urine </li>
                <li>Straining to initiate urination </li>
                <li>Urinary tract obstruction </li>
                <li>Bladder stones </li>
                <li>Blood in the urine </li>
                <li>Incomplete emptying</li>
                </ul>
                <p>Various types of less invasive surgeries are available, and the choice depends on factors like prostate size, overall health, and personal preference. </p>
                <ol>
<li> Prostatic Urethral Lift (PUL), where tiny implants are placed in the prostate using a needle. These implants lift and compress the enlarged prostate, relieving the blockage of the urethra. PUL can be performed with local or general anesthesia, and there are no incisions or removal of tissue, making it suitable for many men with enlarged prostates and urinary symptoms. PUL generally has fewer sexual side effects compared to other prostate surgeries, and its impact on future MRI image quality should be discussed with the doctor, especially if there are allergies to nickel, titanium, or stainless steel.</li>

<li> Temporary Implanted Prostatic Devices (TIPD) are another option, placed in the prostatic urethra via a cystoscope and left in position for about a week before removal. TIPD helps reshape the urine channel, providing modest relief from prostatic obstruction and improving BPH symptoms and urine flow. This low-risk procedure can be done in the operating room or office setting. However, there is a potential for side effects such as urinary tract infections, urinary incontinence, and urethral scarring.</li>

<li> Catheterization involves using a catheter tube in the bladder to drain urine, either through the urethra or a small puncture above the pubic bone. This option is beneficial for men with bladder control issues and a blocked prostate, especially as a temporary measure while waiting for medication or surgery. There are 2 types of catheterization:
<ul>
<li> Clean intermittent catheterizations, where the catheter is inserted and removed every six to eight hours</li>
 
 <li>Indwelling catheterization, which remains in the bladder for longer periods.</li>
</ul>
<p>Infections are a potential risk with catheterization, and the choice of catheterization type depends on the individual's needs and circumstances.</p>

</li>
</ol>

<h3>More Invasive Surgery</h3>

<p>In cases of severe benign prostatic hyperplasia (BPH) or when alternative interventions prove ineffective, more invasive surgical procedures are recommended. Surgery is particularly advisable if you:</p>
<ul>
<li>Are unable to pass urine</li>
<li> Have kidney damage</li>
<li> Experience frequent urinary tract infections</li>
<li> Encounter significant bleeding</li>
<li>Have bladder stones</li>
</ul>

<p>Several more invasive surgical options are available, with the choice depending on factors such as your health, your doctor's expertise, and personal preferences. The following options are presented in order of least invasive to most invasive:</p>
<ol>
<li> Transurethral incision of the prostate (TUIP): This procedure widens the urethra in cases where the prostate gland is small but causing a substantial blockage. Small incisions are made in the bladder neck and prostate, alleviating pressure on the urethra and facilitating easier urination. Hospital stays typically range from one to three days, and a catheter may be left in the bladder for one to three days postsurgery. TUIP is a suitable option for individuals who need surgery but prefer to avoid complete prostatectomy.</li>

<li> Transurethral resection of the prostate (TURP): A common surgery for BPH, TURP employs electric current or laser light to cut and remove tissue. The procedure is performed with anesthesia using a resectoscope inserted through the penis. TURP is suitable for individuals requiring surgery due to moderate to severe BPH symptoms.</li>
<li> Holmium laser enucleation of the prostate (HoLEP): In HoLEP, a surgeon uses a resectoscope to insert a laser into the urethra, destroying excess prostate tissue. This procedure, requiring no incisions, is associated with minimal bleeding, and most patients stay in the hospital for one night. HoLEP is a viable option for men with larger prostates who wish to avoid more invasive surgery, and it may be suitable for those at a higher risk of bleeding.</li>
<li> Thulium laser enucleation of the prostate (ThuLEP): Similar to HoLEP, ThuLEP utilizes a different type of laser to destroy excess prostate tissue. This procedure is recommended for men with larger prostates seeking a less invasive option. Like HoLEP, ThuLEP involves no incisions, minimal bleeding, and a short hospital stay.</li>
<li> Simple prostatectomy: This surgery involves the complete removal of the prostate gland using laparoscopic or robotic-assisted techniques. Reserved for men with the largest prostate glands, simple prostatectomy is considered a long-term cure. Postsurgery, a hospital stay of a few days is typical, with limited activities for several weeks. A catheter is usually required for 1 to 2 weeks during the healing process. Skilled surgeons are essential for this procedure.</li>
</ol>
<p>The choice of surgery depends on individual circumstances, and discussions with the healthcare team can help determine the most suitable option.</p>
                `,
        },
    ];

    const navToProfile = () => {
        props.changeView(4);
    }

    useEffect(() => {
        if (viewVal == 4) {
            navToProfile();
        }
        fetchAllDiagnoses();
    }, [viewVal]);

    const fetchAllDiagnoses = async () => {
        // console.log("====^^^===");
        // console.log("fetchAllDiagnoses START");
        const url = API_DETAILS.baseUrl + API_DETAILS.PORT + API_DETAILS.baseExtension + `/getAllDiagnoses`;
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.get(url, config);
            setDiagnosisData(res.data);
        }
        catch (err) {
            console.error(err);
        }
        // console.log("fetchAllDiagnoses END");
        // console.log("====^^^===");
    };

    const renderActiveDiagnosisName = () => {
        return <div>{diagnosisData[step].name}</div>;
    }

    const handlePageContextChange = (event, newAlignment) => {

        // symptoms, causes, treatment, surgical options
        if (newAlignment == null || newAlignment == 'SYSMPTOMS') {
            setPageContext('SYSMPTOMS');
        }
        else if (newAlignment == null || newAlignment == 'CAUSES') {
            setPageContext('CAUSES');
        }
        else if (newAlignment == null || newAlignment == 'TREATMENT') {
            setPageContext('TREATMENT');
        }
        else if (newAlignment == null || newAlignment == 'SURGICAL_OPTIONS') {
            setPageContext('SURGICAL_OPTIONS');
        }
    }

    return (
        <div className="educate-container">
            <div style={{width:"100%",margin:"0% 2%"}}>
            <Youroheader setView={setViewVal} />
            <h1 style={{marginTop: '0px', marginBottom: '50px', color: 'black' }}>Educate Yourself</h1>
            <div className="educate-container-main">
                <div className="educate-column-one">
                    {diagnosisData && diagnosisData.length != 0 && diagnosisData.map((item, index) => (
                        <div className='diagnosis-list' >
                            <div className={`educate-column-one-name ${step === index && 'educate-column-one-name-active'}`} onClick={() => setStep(index)}>{item.name}</div>
                        </div>
                    ))
                    }
                </div>
                {/* <div className="educate-column-two">
                    <h1>{renderActiveDiagnosisName()}</h1>
                    <p>Have you ever wondered why this happend to you? Watch this video down below</p>

                    <iframe width="70%" height="400" className="educate-iframe"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>

                    <p>Next watch this video...</p>

                    <iframe width="70%" height="400" className="educate-iframe"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </div> */}
                <div className="educate-column-two">
                    <ToggleButtonGroup
                        value={pageContext}
                        exclusive
                        onChange={handlePageContextChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="SYSMPTOMS">Symptoms</ToggleButton>
                        <ToggleButton value="CAUSES">Causes</ToggleButton>
                        <ToggleButton value="TREATMENT">Treatment</ToggleButton>
                        <ToggleButton value="SURGICAL_OPTIONS">Surgical Options</ToggleButton>
                    </ToggleButtonGroup>
                    <div style={{margin:'3%',height:'40vh'}}>
                        {
                            pageContext === "SYSMPTOMS" &&
                            <div dangerouslySetInnerHTML={{ __html: educationalInfo[0].symptoms }} />
                        }
                        {
                            pageContext === "CAUSES" &&
                            <div dangerouslySetInnerHTML={{ __html: educationalInfo[0].causes }} />
                        }
                        {
                            pageContext === "TREATMENT" &&
                            <div dangerouslySetInnerHTML={{ __html: educationalInfo[0].treatment }} />
                        }
                        {
                            pageContext === "SURGICAL_OPTIONS" &&
                            <div dangerouslySetInnerHTML={{ __html: educationalInfo[0].surgical_options }} />
                        }
                    </div>
                </div>

            </div>
            </div>
        </div>
    )
}

export default PatientEducate;