"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

function fluxxorWrapper(WrappedComponent, flux, fluxxorStores, fluxxorProps) {
  return function (_React$Component) {
    _inherits(fluxxorController, _React$Component);

    function fluxxorController(props) {
      _classCallCheck(this, fluxxorController);

      var _this = _possibleConstructorReturn(this, (fluxxorController.__proto__ || Object.getPrototypeOf(fluxxorController)).call(this, props));

      _this.setStateFromFlux = _this.setStateFromFlux.bind(_this);

      _this.state = {};
      return _this;
    }

    _createClass(fluxxorController, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        fluxxorStores.forEach(function (store) {
          flux.store(store).on("change", _this2.setStateFromFlux);
        }, this);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this3 = this;

        fluxxorStores.forEach(function (store) {
          flux.store(store).removeListener("change", _this3.setStateFromFlux);
        }, this);
      }
    }, {
      key: "setStateFromFlux",
      value: function setStateFromFlux() {
        this.setState({ fluxProps: this.getStateFromFlux() });
      }
    }, {
      key: "getStateFromFlux",
      value: function getStateFromFlux() {
        return fluxxorProps(flux);
      }
    }, {
      key: "getFlux",
      value: function getFlux() {
        return flux;
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var propsFromFlux = {};

        Object.keys(this.state.fluxProps).forEach(function (key) {
          propsFromFlux[key] = _this4.state.fluxProps[key];
        }, this);

        var mergedProps = Object.assign({}, this.props, propsFromFlux);

        return React.createElement(WrappedComponent, _extends({}, mergedProps, {
          getFlux: this.getFlux
        }));
      }
    }]);

    return fluxxorController;
  }(React.Component);
}

module.exports = fluxxorWrapper;