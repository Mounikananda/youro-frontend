import { React, useState, useEffect } from 'react';
import Youroheader from "../Youro-header";
import axios from 'axios';
import { API_DETAILS, COOKIE_KEYS } from '../../App';
import Cookies from 'js-cookie';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const PatientEducateRebuilt = (props) => {

    const [step, setStep] = useState(0);
    const [viewVal, setViewVal] = useState(0);
    // const [diagnosisData, setDiagnosisData] = useState([]);
    const [nodeList, setNodeList] = useState([]);
    const [selectedNode, setSelectedNode] = useState({});
    const [pageContext, setPageContext] = useState('SYSMPTOMS');

    const navToProfile = () => {
        props.changeView(4);
    }

    useEffect(() => {
        if (viewVal == 4) {
            navToProfile();
        }
        // fetchAllDiagnoses();
        fetchData();
    }, [viewVal]);

    const fetchData = async (props) => {
        const patientId = Cookies.get(COOKIE_KEYS.userId);

        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + API_DETAILS.baseExtension +`/getLatestCarePlanByPatient?patientId=${patientId}`;
    
        try {
        const res = await axios.get(url);
        console.log('res data', res.data);
        setNodeList(buildNodeList(res.data));
        } catch (err) {
        console.error(err);
        }
      };
    
      const buildNodeList = (data) => {
        const nodeList = [];
        let idx = 0;
        nodeList.push({
            id: idx,
            name: data.diagName,
            level: 0,
            hidden: false,
            expanded: true,
            parent: null,
            overview: data.diagInfo
        })
        setSelectedNode(nodeList[0]);
        idx++;
        const presTypesToShow = ['Medicines', 'Lifestyle', 'Vitamins'];

        const presTypeNameMap = {};
        const prescriptions = data.carePlan.presTypes
        Object.keys(prescriptions).forEach(pres => {
          const name = prescriptions[pres][0].type.name
          if (presTypesToShow.includes(name)) presTypeNameMap[pres] = name;
        })
        Object.entries(presTypeNameMap).forEach( ([presType, presTypeName]) => {
            if (prescriptions[presType].length !== 0) {
                nodeList.push({
                    id: idx,
                    name: presTypeName,
                    level: 1,
                    hidden: false,
                    expanded: true,
                    parent: 0,
                    overview: null
                })
                const prnt = idx;
                idx++;
                Object.entries(Object.groupBy(prescriptions[presType], ({ categoryName }) => categoryName)).map(([categoryName, items]) => {
                  let cat = null;
                  if (categoryName !== 'null') {
                      nodeList.push({
                        id: idx,
                        name: categoryName,
                        level: 2,
                        hidden: false,
                        expanded: false,
                        parent: prnt,
                        overview: null
                      })
                      cat = idx;
                      idx++
                  }
                  items.forEach(pres => {
                    nodeList.push({
                        id: idx,
                        name: pres.presName,
                        level: categoryName !== 'null' ? 3 : 2,
                        hidden: false,
                        expanded: false,
                        parent: categoryName !== 'null' ? prnt : cat,
                        overview: pres.overview
                    })
                    idx++
                })
                })

            }
        });
        console.log(nodeList)
        return nodeList

      }

    const toggleChevron = (e, node) => {
      e.preventDefault();
      if (node.level == 0) {
        setNodeList(nodeList.map(n => {
          if (n.level > node.level) {
            return {
              ...n,
              hidden: !n.hidden
            }
          }
          return {
            ...n,
            expanded: !n.expanded
          }
        }))
      } else {
        setNodeList(nodeList.map(n => {
          if (n.id == node.id) {
            return {
              ...n,
              expanded: !n.expanded
            }
          }
          if (n.parent == node.id) {
            return {
              ...n,
              hidden: !n.hidden
            }
          }
          return n
        }))
      }
    }

    const onClickNode = (e, node) => {
      e.preventDefault();
      if (node.level !== 1 || node.level !== 2) {
        setSelectedNode(node)
      }
    }
    return (
        <div className="educate-container">
            <div style={{width:"100%",margin:"0% 2%"}}>
            <Youroheader setView={setViewVal} />
            <h1 style={{marginTop: '0px', marginBottom: '50px', color: 'black' }}>Educate Yourself</h1>
            <div className="educate-container-main">
                <div className="educate-column-one">
                    {nodeList && nodeList.length !== 0 && nodeList.map(node => (
                        <div className='diagnosis-list' >
                          {!node.hidden && (
                            <div 
                              className={`educate-column-one-name ${node.id === selectedNode.id && 'educate-column-one-name-active'} ${`level-${node.level}`}`}
                              onClick={(e, d) => onClickNode(e, node)}
                            >
                              {node.level !== 3 && (
                                <span 
                                  class="material-symbols-outlined"
                                  style={{ color: "gray", marginRight: "8px"}}
                                  onClick={(e,_) => toggleChevron(e, node)}
                                >
                                  {node.expanded ? "expand_more" : "chevron_right"}
                                </span>
                              )}
                              {node.name}
                            </div>
                          )}
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
                  <h2>{selectedNode.name}</h2>
                  <div dangerouslySetInnerHTML={{ __html: selectedNode.overview || '<p></p>' }} />
                </div>

            </div>
            </div>
        </div>
    )
}

export default PatientEducateRebuilt;