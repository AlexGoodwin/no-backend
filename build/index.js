"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _range = require("lodash/range");

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// bit.ly/s-pcs
var possibleCombinationSum = function possibleCombinationSum(arr, n) {
  if (arr.indexOf(n) >= 0) {
    return true;
  }
  if (arr[0] > n) {
    return false;
  }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length,
      combinationsCount = 1 << listSize;
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & 1 << j) {
        combinationSum += arr[j];
      }
    }
    if (n === combinationSum) {
      return true;
    }
  }
  return false;
};

var Stars = function Stars(props) {
  return React.createElement(
    "div",
    { className: "col-5" },
    _.range(props.numberOfStars).map(function (i) {
      return React.createElement("i", { key: i, className: "fa fa-star" });
    })
  );
};

var Button = function Button(props) {
  var button = void 0;
  switch (props.answerIsCorrect) {
    case true:
      button = React.createElement(
        "button",
        { className: "btn btn-success", onClick: props.acceptAnswer },
        React.createElement("i", { className: "fa fa-check" })
      );
      break;
    case false:
      button = React.createElement(
        "button",
        { className: "btn btn-danger" },
        React.createElement("i", { className: "fa fa-times" })
      );
      break;
    default:
      button = React.createElement(
        "button",
        { className: "btn",
          onClick: props.checkAnswer,
          disabled: props.selectedNumbers.length === 0 },
        "="
      );
      break;
  }
  return React.createElement(
    "div",
    { className: "col-2 text-center" },
    button,
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement(
      "button",
      { className: "btn btn-warning btn-sm", onClick: props.redraw,
        disabled: props.redraws === 0 },
      React.createElement("i", { className: "fa fa-refresh" }),
      " ",
      props.redraws
    )
  );
};

var Answer = function Answer(props) {
  return React.createElement(
    "div",
    { className: "col-5" },
    props.selectedNumbers.map(function (number, i) {
      return React.createElement(
        "span",
        { key: i, onClick: function onClick() {
            return props.unselectNumber(number);
          } },
        number
      );
    })
  );
};

var Numbers = function Numbers(props) {
  var numberClassName = function numberClassName(number) {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  };
  return React.createElement(
    "div",
    { className: "card text-center" },
    React.createElement(
      "div",
      null,
      Numbers.list.map(function (number, i) {
        return React.createElement(
          "span",
          { key: i, className: numberClassName(number),
            onClick: function onClick() {
              return props.selectNumber(number);
            } },
          number
        );
      })
    )
  );
};

Numbers.list = _.range(1, 10);

var DoneFrame = function DoneFrame(props) {
  return React.createElement(
    "div",
    { className: "text-center" },
    React.createElement(
      "h2",
      null,
      props.doneStatus
    ),
    React.createElement(
      "button",
      { className: "btn btn-secondary", onClick: props.resetGame },
      "Play Again"
    )
  );
};

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Game);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Game.__proto__ || Object.getPrototypeOf(Game)).call.apply(_ref, [this].concat(args))), _this), _this.state = Game.initialState(), _this.resetGame = function () {
      return _this.setState(Game.initialState());
    }, _this.selectNumber = function (clickedNumber) {
      if (_this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
        return;
      }
      _this.setState(function (prevState) {
        return {
          answerIsCorrect: null,
          selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        };
      });
    }, _this.unselectNumber = function (clickedNumber) {
      _this.setState(function (prevState) {
        return {
          answerIsCorrect: null,
          selectedNumbers: prevState.selectedNumbers.filter(function (number) {
            return number !== clickedNumber;
          })
        };
      });
    }, _this.checkAnswer = function () {
      _this.setState(function (prevState) {
        return {
          answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce(function (acc, n) {
            return acc + n;
          }, 0)
        };
      });
    }, _this.acceptAnswer = function () {
      _this.setState(function (prevState) {
        return {
          usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
          selectedNumbers: [],
          answerIsCorrect: null,
          randomNumberOfStars: Game.randomNumber()
        };
      }, _this.updateDoneStatus);
    }, _this.redraw = function () {
      if (_this.state.redraws === 0) {
        return;
      }
      _this.setState(function (prevState) {
        return {
          randomNumberOfStars: Game.randomNumber(),
          answerIsCorrect: null,
          selectedNumbers: [],
          redraws: prevState.redraws - 1
        };
      }, _this.updateDoneStatus);
    }, _this.possibleSolutions = function (_ref2) {
      var randomNumberOfStars = _ref2.randomNumberOfStars,
          usedNumbers = _ref2.usedNumbers;

      var possibleNumbers = _.range(1, 10).filter(function (number) {
        return usedNumbers.indexOf(number) === -1;
      });

      return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    }, _this.updateDoneStatus = function () {
      _this.setState(function (prevState) {
        if (prevState.usedNumbers.length === 9) {
          return { doneStatus: 'Done. Nice!' };
        }
        if (prevState.redraws === 0 && !_this.possibleSolutions(prevState)) {
          return { doneStatus: 'Game Over!' };
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Game, [{
    key: "render",
    value: function render() {
      var _state = this.state,
          selectedNumbers = _state.selectedNumbers,
          randomNumberOfStars = _state.randomNumberOfStars,
          answerIsCorrect = _state.answerIsCorrect,
          usedNumbers = _state.usedNumbers,
          redraws = _state.redraws,
          doneStatus = _state.doneStatus;


      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h3",
          null,
          "Play Nine"
        ),
        React.createElement("hr", null),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(Stars, { numberOfStars: randomNumberOfStars }),
          React.createElement(Button, { selectedNumbers: selectedNumbers,
            redraws: redraws,
            checkAnswer: this.checkAnswer,
            acceptAnswer: this.acceptAnswer,
            redraw: this.redraw,
            answerIsCorrect: answerIsCorrect }),
          React.createElement(Answer, { selectedNumbers: selectedNumbers,
            unselectNumber: this.unselectNumber })
        ),
        React.createElement("br", null),
        doneStatus ? React.createElement(DoneFrame, { resetGame: this.resetGame, doneStatus: doneStatus }) : React.createElement(Numbers, { selectedNumbers: selectedNumbers,
          selectNumber: this.selectNumber,
          usedNumbers: usedNumbers })
      );
    }
  }]);

  return Game;
}(React.Component);

Game.randomNumber = function () {
  return 1 + Math.floor(Math.random() * 9);
};

Game.initialState = function () {
  return {
    selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    usedNumbers: [],
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null
  };
};

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Game, null)
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('mountNode'));