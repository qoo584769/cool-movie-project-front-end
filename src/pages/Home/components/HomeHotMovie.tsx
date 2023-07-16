import hotMovieImg from "../../../assets/images/hotMovieImg.png"

export const HomeHotMovie = () => {
  return (
    <div className="bg-main">
      <div className="container">
      <div className="row">
        <div className="col-6 col-md-6">
          <img src="../../../assets/images/hotMovieImg.png" alt="image" style={{ maxWidth: '100%' }} />
        </div>
        <div className="col-6 col-md-6 d-flex flex-column justify-content-center ps-4">
          <div className='text-gold'>捍衛任務4</div>
          <div className='text-white pt-4'>《捍衛任務系列》原班人馬打造最新史詩篇章， 「葉問」對決「殺神」!香港動作男星[甄子丹]正式參戰， 與[基努李維]展開大銀幕對決。</div>
          <div className='pt-5 d-flex'>
            <button type="button" className='flex-fill me-2 bd-gold text-gold bg-dark'>電影簡介</button>
            <button type="button" className='flex-fill bg-gold text-dark bd-gold'>立即訂票</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
