export default {
// table样式
  cellStyle({ row, column, rowIndex, columnIndex }) {
    return 'text-align: center;padding-left: 0;padding-right: 0;';
  },
  rowClass({ row, rowIndex }) {
    return 'text-align: center;background: #F9FAFC;padding-left: 0;padding-right: 0;';
  },
  headClass({ row, rowIndex }) {
    return 'background: #F9FAFC;';
  }
};
