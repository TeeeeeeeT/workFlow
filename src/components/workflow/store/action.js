function changeCurrentBtn(btn) {
  return {
    type: 'changeCurrentBtn',
    value: btn,
  };
}

function setNodes(nodes) {
  return {
    type: 'setNodes',
    value: nodes,
  };
}

function setLines(lines) {
  return {
    type: 'setLines',
    value: lines,
  };
}

const action = {
  changeCurrentBtn,
  setNodes,
  setLines,
};

export default action;
