function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // calculator designed to look like mac calculator, with slight changes to match test conditions. +/- button replaced with a single char clear. AC C and % keys different color and border enlarged. Ended up looking more like a handheld calculator.

// const to assign number and id to buttons, ops is for keyboard control. isOps is for logic tests.

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
const isOps = /[*\/+-]/;
const ops = ["/", "*", "-", "+", "="];
const ids = {
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  ".": "decimal",
  "/": "divide",
  "*": "multiply",
  "+": "add",
  "-": "subtract",
  "=": "equals" };


class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",

    {
      currentValue: "0",
      prevValue: "",
      calc: "",
      operator: "",
      lastPressed: "" });_defineProperty(this, "handleKeyDown",



















































































































































    e => {
      let { key } = e;

      if (key === "Enter") {
        key = "=";
      }
      if (/\d/.test(key)) {
        e.preventDefault();
        this.inputDigit(parseInt(key, 10));
      } else if (ops.includes(key)) {
        e.preventDefault();
        this.performOperation(key);
      } else if (key === ".") {
        e.preventDefault();
        this.inputDot();
      } else if (key === "Backspace") {
        e.preventDefault();
        this.clearLastChar();
      } else if (key === "Clear") {
        e.preventDefault();
        if (this.state.displayValue !== "0") {
          this.clearDisplay();
        } else {
          this.clearAll();
        }
      }
    });} // not needed for challenge, converts currentValue to decimal for percent based operations.
  percentChange() {const { currentValue, calc } = this.state;if (/\d/g.test(currentValue)) {let percent = parseFloat(currentValue) / 100;let index = currentValue.length;this.setState({ currentValue: percent, calc: calc.substring(0, calc.length - index) + percent });}} // Add decimal point to one position only.
  inputDot() {const { currentValue, lastPressed, calc } = this.state;if (!/\./.test(currentValue)) {this.setState({ calc: calc === "" || isOps.test(currentValue) ? calc + "0." : calc + ".", currentValue: currentValue === "0" || isOps.test(currentValue) ? "0." : currentValue + ".", lastPressed: "." });} /*  This will move decimal from first position to end of currentValue. ex: 5.5 is currentValue, press '.' currentValue becomes 55. personally I think this makes more sense.
      else {
      this.setState({
        currentValue: currentValue.replace('.', '') + '.',
        lastPressed: '.',
        calc: calc.replace('.', '') + '.'
      })
    } */} // nextOperator is button pressed, operator keeps track of prev operand used. Calc is equation entered before = sign. Logic prevents 2 consecutive operands except for - sign being entered. If 2 are pressed in a row the first is deleted and the new one (nextoperator) is added.
  performOperation(nextOperator) {const { currentValue, prevValue, calc, operator, lastPressed } = this.state;const prevKey = lastPressed;if (!isOps.test(currentValue) && nextOperator !== "=") {this.setState({ operator: nextOperator, prevValue: currentValue, currentValue: nextOperator, lastPressed: nextOperator, calc: calc + nextOperator });} else if (isOps.test(currentValue)) {if (nextOperator !== "-" && operator === "-") {this.setState({ operator: nextOperator, currentValue: nextOperator, lastPressed: nextOperator, calc: calc.substring(0, calc.length - 2) + nextOperator });} else if (nextOperator !== "-" && nextOperator !== "=") {this.setState({ operator: nextOperator, currentValue: nextOperator, lastPressed: nextOperator, calc: operator === "" ? calc + nextOperator : calc.substring(0, calc.length - 1) + nextOperator });} else if (nextOperator === "-" && prevKey !== "-") {this.setState({ operator: nextOperator, currentValue: nextOperator, lastPressed: nextOperator, calc: calc + nextOperator });}} else if (nextOperator === "=") {const newValue = eval(calc);this.setState({ operator: "", prevValue: "", currentValue: String(newValue).length > 12 ? String(newValue).substring(0, 12) : String(newValue), calc: String(newValue), lastPressed: nextOperator });}} // Handle number buttons. This calculator can fit 12 digits before overflow so it first checks the currentValue length, if it exceeds 12 it will not update new numbers and remain the current 12. If under 12 it will add digits to currentValue and calc unless the currentValue is an operand in which case it will start a new currentValue. Relies on performOperation to save currentValue as prevValue.
  inputDigit(digit) {const { currentValue, lastPressed, calc, prevValue } = this.state;let inputValue = String(digit);if (currentValue.length < 12) {if (currentValue === "0") {this.setState({ currentValue: inputValue, calc: inputValue === "0" ? calc : calc + inputValue });} else {this.setState({ currentValue: !isOps.test(currentValue) ? currentValue + inputValue : inputValue, calc: calc + inputValue });}}} // set to initial state
  clearAll() {this.setState({ currentValue: "0", prevValue: "", calc: "", operator: "", lastClicked: "" });} // remove last char from currentValue and calc until reaches '0' and '' respectivly
  clearLastChar() {const { currentValue, lastPressed, calc } = this.state;this.setState({ currentValue: currentValue.substring(0, currentValue.length - 1) || "0", lastPressed: "C", calc: calc.substring(0, calc.length - 1) || "" });} // Handles keyBoard presses rather than clicks
  // event listeners for keydown presses on keyboard.
  componentDidMount() {document.addEventListener("keydown", this.handleKeyDown);}componentWillUnmount() {document.removeEventListener("keydown", this.handleKeyDown);}render() {return /*#__PURE__*/React.createElement("div", { className: "calculator" }, /*#__PURE__*/React.createElement("div", { id: "display-container", className: "display" }, /*#__PURE__*/
    React.createElement("p", { className: "calc-display" }, this.state.calc), /*#__PURE__*/
    React.createElement("div", { id: "display", className: "display-currentNumber" },
    this.state.currentValue)), /*#__PURE__*/


    React.createElement("div", { className: "calc-buttons" }, /*#__PURE__*/
    React.createElement("div", { className: "nums-container" }, /*#__PURE__*/
    React.createElement("button", { className: "ac", id: "clear", onClick: () => this.clearAll() }, "AC"), /*#__PURE__*/


    React.createElement("button", { className: "delete", onClick: () => this.clearLastChar() }, "C"), /*#__PURE__*/


    React.createElement("button", { className: "percent", onClick: () => this.percentChange() }, "%"),
    nums.map((num) => /*#__PURE__*/
    React.createElement("button", {
      className: `numbers ${num === 0 && `big-button`}`,
      key: num,
      id: ids[num],
      onClick: () =>
      num !== "." ? this.inputDigit(num) : this.inputDot() },


    num))), /*#__PURE__*/



    React.createElement("div", { className: "ops-container" },
    ops.map((op) => /*#__PURE__*/
    React.createElement("button", {
      className: "operations",
      key: op,
      id: ids[op],
      onClick: () => this.performOperation(op) },

    op)))));






  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));