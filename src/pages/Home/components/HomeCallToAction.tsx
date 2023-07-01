import React from 'react';
import cardImg1 from "/images/cardImg1.png"
import cardImg2 from "/images/cardImg2.png"
import cardImg3 from "/images/cardImg3.png"

// 卡片資料
const cards = [
    {
      id: "1",
      imageSrc: `/images/homePage/cardImg1.png`,
      title: "分享連結",
      description: "分享專屬連結，送好友 2 張 77 折券"
    },
    {
       id: "2",
       imageSrc: "/images/homePage/cardImg2.png",
       title: "好友註冊",
       description:
         "好友完成註冊，會員即可獲得 2 張 77 折券和會員點數 200 點",
     },
     {
       id: "3",
       imageSrc:"/images/homePage/cardImg3.png", 
       title: "獲得優惠",
       description:
         "好友 2 個月內購票 2 張以上， 即可獲得 77 折券一張",
     }
  ];

// 資料模板
const ThreeCards = (props: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; cardsData: any[]; }) => {
  return (
    <>
      <h2 className="text-gold text-center">{props.title}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {props.cardsData.map((cardData) => (
          <div key={cardData.id} className="col mb-4">
            {/* 卡片元件，傳入相關資料 */}
            <div className="card h-100 bg-dark">
              <img src={cardData.imageSrc} className="card-img-top cus-card-img rounded mx-auto d-block" alt="" />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-white text-center">{cardData.title}</h5>
                <p className="card-text text-white text-center">{cardData.description}</p>
              </div>
            </div>  
          </div> 
        ))}       
        
      </div>
    </>
  )
}

export const HomeCallToAction = ()=>{
  return (    
    <div className="bg-dark">

      <div className="container bd-gold">
        <ThreeCards 
          title="邀請好友一起看電影， 電影 77 折券一起拿！"
          cardsData={cards}
        />
      </div>

    </div>
  )
}
