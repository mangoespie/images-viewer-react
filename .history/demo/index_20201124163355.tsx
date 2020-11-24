import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Viewer from '../src/Viewer';
const Failed  = require('./images/failed.png');
const PDF = require('./images/pdf.png')
const img = require('./images/image.pdf')
// const img1 = require('./images/image1.jpg');
const img2 = require('./images/image2.jpg');
const img3 = require('./images/image3.jpg');
const img4 = require('./images/image4.jpg');
const img5 = require('./images/image5.jpg');
const img6 = require('./images/image6.jpg');
import './index.less';
import classNames from 'classnames';
import { Button, List, Checkbox } from 'antd';
const ButtonGroup = Button.Group;

interface State {
  visible: boolean;
  activeIndex: number;
  mode: 'modal' | 'inline';
  drawerVisible: boolean;
  drag: boolean;
  attribute: boolean;
}

interface OptionData {
  key: string;
  type: 'boolean';
  value?: any;
}

const optionData: OptionData[] = [{
  key: 'drag',
  type: 'boolean',
}, {
  key: 'attribute',
  type: 'boolean',
}, {
  key: 'zoomable',
  type: 'boolean',
}, {
  key: 'rotatable',
  type: 'boolean',
}, {
  key: 'scalable',
  type: 'boolean',
}, {
  key: 'downloadable',
  type: 'boolean',
}, {
  key: 'loop',
  type: 'boolean',
}, {
  key: 'noClose',
  type: 'boolean',
  value: false,
}, {
  key: 'noImgDetails',
  type: 'boolean',
  value: false,
}, {
  key: 'noNavbar',
  type: 'boolean',
  value: false,
}, {
  key: 'noToolbar',
  type: 'boolean',
  value: false,
}, {
  key: 'noFooter',
  type: 'boolean',
  value: false,
}, {
  key: 'changeable',
  type: 'boolean',
}, {
  key: 'disableKeyboardSupport',
  type: 'boolean',
  value: false,
}, {
  key: 'noResetZoomAfterChange',
  type: 'boolean',
  value: false,
}, {
  key: 'noLimitInitializationSize',
  type: 'boolean',
  value: false,
}, {
  key: 'disableMouseZoom',
  type: 'boolean',
  value: false,
}, {
  key: 'downloadInNewWindow',
  type: 'boolean',
  value: false,
}, {
  key: 'showTotal',
  type: 'boolean',
}];

class App extends React.Component<any, Partial<State>> {
  container: HTMLDivElement;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      activeIndex: 6,
      mode: 'modal',
    };
    optionData.forEach(item => {
      if (item.value === undefined) {
        this.state[item.key] = true;
      } else {
        this.state[item.key] = item.value;
      }
    });
  }

  handleChangeModal = (e) => {
    this.setState({
      mode: 'modal',
    });
  }

  handleChangeInline = (e) => {
    this.setState({
      mode: 'inline',
      visible: true,
    });
  }

  handleOption = key => {
    this.setState({
      [key]: !this.state[key],
    });
  }

  render() {
    let defaultImg = {
      src: Failed,
      navSrc: Failed,
    }
    let images = [{
      navSrc: Failed,
      src: '',
      alt: 'lake',
      downloadUrl: 'https://infeng.github.io/react-viewer/59111ff2c38954887bc313887fe76e27.jpg',
    }, {
      navSrc: img2,
      src: img2,
      alt: 'mountain',
      downloadUrl: '',
    }, {
      navSrc: img,
      src: img,
      alt: 'pdf',
      downloadUrl: '',
    }, {
      navSrc: img3,
      src: img3,
      alt: '',
      downloadUrl: '',
    }, {
      navSrc: img4,
      src: img4,
      alt: '',
      downloadUrl: '',
    }, {
      navSrc: img5,
      src: img5,
      alt: '',
      downloadUrl: '',
    }, {
      navSrc: img6,
      src: img6,
      alt: '',
      downloadUrl: '',
    }];

    let inline = this.state.mode === 'inline';

    let inlineContainerClass = classNames('inline-container', {
      show: this.state.visible && inline,
    });

    let imgListClass = classNames('img-list', {
      hide: this.state.visible && inline,
    });

    let options = {};
    optionData.forEach(item => {
      options[item.key] = this.state[item.key];
    });

    const getPreData = () => {
      console.log(111777)
    }

    const getNextData = () => {
      console.log(222888)
    }

    return (
      <div>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-brand">
              images-viewer-react
            </div>
            <a className="bagde" href="https://npmjs.org/package/images-viewer-react">
              <img src="https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=3.0.0&x2=0" />
            </a>

            <div className="github">
              <a className="bagde" href="https://github.com/candy-girl/images-viewer-react">
                <img
                src="https://img.shields.io/github/stars/candy-girl/images-viewer-react?style=social"
                />
              </a>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="wrap">
            <div>
              <h2>Options</h2>
              <div className="options">
                <ButtonGroup>
                  <Button
                    type={inline ? null : 'primary'}
                    onClick={this.handleChangeModal}
                  >
                      Modal mode
                  </Button>
                  <Button
                    type={inline ? 'primary' : null}
                    onClick={this.handleChangeInline}
                  >
                      Inline mode
                  </Button>
                </ButtonGroup>
                <List
                  className="options-list"
                  bordered
                  dataSource={optionData}
                  renderItem={item => {
                    let content = null;
                    switch (item.type) {
                      case 'boolean':
                        content = (
                          <Checkbox
                            checked={this.state[item.key]}
                            onChange={() => { this.handleOption(item.key); }}
                          >
                            {item.key}
                          </Checkbox>
                        );
                        break;
                      default:
                        break;
                    }
                    return (
                      <List.Item>
                        {content}
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
            <div className="img-list-wrap">
              <div className={imgListClass}>
                {images.map((item, index) => {
                  return (
                    <div key={index.toString()} className="img-item">
                      <img src={item.src?.endsWith('.pdf') ? PDF : item.src||Failed} onClick={() => {
                        this.setState({
                          visible: true,
                          activeIndex: index,
                        });
                      }}/>
                    </div>
                  );
                })}
              </div>
              <div className={inlineContainerClass} ref={ref => {this.container = ref; }}></div>
            </div>
          </div>
          <Viewer
            visible={this.state.visible}
            onClose={() => {
              this.setState({ visible: false });
            }}
            downloadInNewWindow={true}
            images={images}
            navImgWidth={100}
            activeIndex={this.state.activeIndex}
            container={inline ? this.container : null}
            downloadable={true}
            onChange={(activeImage, index) => console.log(111,activeImage, index)}
            defaultImg={defaultImg}
            // onPreButton={getPreData}
            onNextButton={getNextData}
            customToolbar={(toolbars) => {
              return toolbars.concat([{
                key: 'test',
                render: <div>C</div>,
                onClick: (activeImage) => {
                  console.log(activeImage);
                },
              }]);
            }}
            {...options}
          />
        </div>
        <div className="footer">
          <div className="container-footer">
            <a href="https://github.com/candy-girl" className="signature">@candyGirl</a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
