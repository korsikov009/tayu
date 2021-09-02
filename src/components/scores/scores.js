import React, { Component } from 'react';

class Scores extends Component {
  prevScoreV = -1;
  prevScoreH = -1;

  triggerAnimation() {
    const { scoreV, scoreH } = this.props;
    const _triggerAnimation = (style) => {
      style.animation = 'scoreUpdate .3s linear';
      setTimeout(() => style.animation = '', 300);
    };

    if (scoreV !== this.prevScoreV) {
      _triggerAnimation(this.scoreVDom.style);
      this.prevScoreV = scoreV;
    }

    if (scoreH !== this.prevScoreH) {
      _triggerAnimation(this.scoreHDom.style);
      this.prevScoreH = scoreH;
    }
  }

  componentDidMount() {
    this.triggerAnimation();
  }

  componentDidUpdate() {
    this.triggerAnimation();
  }

  render() {
    const { scoreV, scoreH } = this.props;

    return (
      <div style={{padding: '10px'}}>
        <div className="score vertical" ref={el => this.scoreVDom = el}>
          {scoreV}
        </div>
        <div className="score horizontal" ref={el => this.scoreHDom = el}>
          {scoreH}
        </div>
      </div>
    );
  }
}

export default Scores;
