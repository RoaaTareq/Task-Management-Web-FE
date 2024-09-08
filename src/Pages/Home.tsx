import React from 'react';
import ToDo from '../Components/Media/TopSectionMedia'
import '../index.css'
const Home: React.FC = () => {
  return (
    <section className='Home-section'>
      <div className="container">
     <div className="row align-items-center">
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12" >
      <h1>Brings all your tasks, teammates, and tools together</h1>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
<ToDo/>
      </div>
     </div>
      </div>
    </section>
  );
};

export default Home;
