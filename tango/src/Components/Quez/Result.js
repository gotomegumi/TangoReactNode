import React from 'react'

const Rsult = () => {
  return (
        <div className="card-wrap light-theme last-card">
          <h2 className="last-title-k">완료!</h2>
          <p className="last-title">完了！</p>
          <p>今回の正解数</p>
              <div className="this-ar">0/0</div> 
          <p>全体の正解率</p> 
          <div  className="bar-wrap ar bar3-wrap">
              <div id="result-bar" className="ar bar3"></div>
          </div>  
          <p>進捗</p>
          <div  className="bar-wrap prg bar3-wrap">
              <div id="result-bar2" className="prg bar3"></div>
          </div>  
          <div className="last-goto light-theme">       
              <a className="lg1" href="#">recordを見る</a>
              <a className="lg1" href="/">home</a>
              <a className="lg2">続ける</a>
          </div>
        </div>
  )
}

export default Rsult