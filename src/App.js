import React, { Component, Fragment, createRef } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Baffle from "baffle-react";
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './App.scss';
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Form'

class App extends Component {

  dash = createRef();

  state = {
    activeSection: 0,
    obfuscate: false
  }

  afterLoad = () => {
    this.setState({ obfuscate: false })
  }

  onLeave = (origin, destination) => {
    this.setState({ activeSection: destination.index, obfuscate: true })
  }

  afterSend = () => {
    this.dash.current.style.width = "0";
  }

  render() {
    const characters = '█▒/ ██▒▒▒ █▓█▓▒ ░▒/ █░>█▓ ▒▒</ ▒▓░ █▒▒░ ░░█▒';
    SwiperCore.use([Navigation, Autoplay]);
    const menu = ['about', 'works', 'contact']; const gallery = [
      // { src: require('./img/projects/possible.webp'), description: 'Possible', href: 'https://bn-possible.netlify.app', },
      { src: require('./img/projects/quote-machine.webp'), description: 'Quote Machine', href: 'https://bn-quote-machine.netlify.app', },
      { src: require('./img/projects/markdown-previewer.webp'), description: 'Markdown Previewer', href: 'https://bn-markdown-previewer.netlify.app', },
      { src: require('./img/projects/drum-machine.webp'), description: 'Drum Machine', href: 'https://bn-drum-machine.netlify.app', }
    ]
    const { obfuscate } = this.state;

    return (
      <Fragment>
        <Header anchors={menu} />
        <ReactFullpage
          anchors={menu}
          menu={"#menu"}
          paddingTop={'8vw'}
          paddingBottom={'8vw'}
          onLeave={this.onLeave}
          afterLoad={this.afterLoad}
          render={() => {
            return (
              <main>
                <section className="section about">
                  <h1 className="title">
                    <span className="highlighted" data-stroke="Hey,&nbsp;">Hey,&nbsp;</span>
                    <Baffle
                      speed={100}
                      characters={characters}
                      obfuscate={this.state.activeSection === 0 ? obfuscate : false}
                      revealDuration={2000}
                    >I am Bogdan
                    </Baffle>
                  </h1>
                  <p className="subtitle">
                    <Baffle
                      speed={100}
                      characters={characters}
                      obfuscate={this.state.activeSection === 0 ? obfuscate : false}
                      revealDuration={2000}
                    >Junior
                      </Baffle>
                    <span className="highlighted" data-stroke="&nbsp;User&nbsp;">&nbsp;User&nbsp;</span>
                    <Baffle
                      speed={100}
                      characters={characters}
                      obfuscate={this.state.activeSection === 0 ? obfuscate : false}
                      revealDuration={2000}
                    >Interface Developer
                      </Baffle>
                  </p>
                </section>
                <section className="section work">
                  <Swiper
                    wrapperTag="ul"
                    breakpoints={{ 0: { spaceBetween: 40 }, 576: { spaceBetween: 80 }, 768: { spaceBetween: 120 } }}
                    navigation
                    slidesPerView={2}
                    centeredSlides={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    speed={400}
                    simulateTouch={false}
                  >
                    {gallery.map(item => (
                      <SwiperSlide tag="li" key={item.description}>
                        <figure className="figure">
                          <a className="figure__link" href={item.href} target="_blank" rel="noopener noreferrer">
                            <img className="figure__img" alt={item.description} src={item.src} width="640" height="360" />
                          </a>
                          <figcaption className="figure__figcaption"><a href={item.href} target="_blank" rel="noopener noreferrer" className="figure__description">{item.description}</a></figcaption>
                        </figure>
                      </SwiperSlide>))}
                  </Swiper>
                </section>
                <section className="section contact">
                  <div className="container">
                    <Form afterSend={this.afterSend} />
                    <div className="hero">
                      <h2 className="title title--right">
                        <Baffle
                          speed={100}
                          characters={characters}
                          obfuscate={this.state.activeSection === 2 ? obfuscate : false}
                          revealDuration={2000}
                        >Contact
                        </Baffle>
                        <br /><span ref={this.dash} className="dash"></span>
                        <Baffle
                          speed={100}
                          characters={characters}
                          obfuscate={this.state.activeSection === 2 ? obfuscate : false}
                          revealDuration={2000}
                        >me
                        </Baffle>
                      </h2>
                      <p className="subtitle">It is very important for me to keep in touch with you, so I am always ready to answer any question that interests you.<span className="highlighted" data-stroke="&nbsp;Shoot!">&nbsp;Shoot!</span></p>
                    </div>
                  </div>
                </section>
              </main>
            );
          }}
        />
        <Footer />
      </Fragment >
    )
  }
}

export default App;
