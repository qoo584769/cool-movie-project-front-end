
import block from "/images/block.png"
import customer from "/images/customer.png"

export const HomeDiscount = ()=>{
  return (    
    <div className="bg-discount">
      <img src="/images/homePage/block.png" alt="image" style={{ maxWidth: '100%' }} />
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 d-flex flex-column justify-content-center pe-md-5">    
                <div className="text-gold mb-4">電影之夜套餐優惠</div>
                <div className="text-white">和另一半一起來全台最豪華影城看電影，享情侶套餐超划算！ 包括 2 張電影票、2 份私廚料理 套餐和調酒，原價 1230 元，現在只需 999 元。</div>
              </div>
              <div className="col-12 col-md-6 text-center">
                <img src="/images/homePage/customer.png" alt="image" style={{ maxWidth: '100%', margin:'-24px 0', display:'block' }} />
              </div>
            </div>
          </div>   
          
        <img src="/images/homePage/block.png" alt="image" style={{ maxWidth: '100%','zIndex':'-100' }} />
        </div>
  )
}