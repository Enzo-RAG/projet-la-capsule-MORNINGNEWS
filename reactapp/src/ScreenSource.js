import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';


function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])
  const [selectedLang, setSelectedLang] = useState(props.selectedLang)

  // 2b8e328399ff410a85a40b7a224ed953
  useEffect(() => {
    const APIResultsLoading = async() => {
      var langue = 'fr'
      var country = 'fr'
        
      if(selectedLang == 'en'){
        var langue = 'en'
        var country = 'us'
      }
      props.changeLang(selectedLang)
      const data = await fetch('/getArticles')
      const body = await data.json()
      setSourceList(body.dataParse.sources)
    }

    APIResultsLoading()
  }, [selectedLang]) 

  return (
    <div>
        <Nav/>
       
       <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="Banner">
          <img className="salut" style={{width:'40px', margin:'10px',cursor:'pointer'}} src='/images/fr.png' onClick={() => setSelectedLang('fr')} />
          <img className="salut" style={{width:'40px', margin:'10px',cursor:'pointer'}} src='/images/uk.png' onClick={() => setSelectedLang('en')} /> 
        </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                       <List.Item.Meta /*{onClick={() => handleSourceClick(source.id)}} */
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`} > {source.name} </Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapStateToProps(state){
  return {selectedLang: state.selectedLang}
}

function mapDispatchToProps(dispatch){
  return {
    changeLang: function(selectedLang){
      dispatch({type: 'changeLang', selectedLang: selectedLang})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)
