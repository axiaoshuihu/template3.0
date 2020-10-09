import { parseTime } from '@/utils';
import { export_json_to_excel } from '@/vendor/Export2Excel';
function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => {
      if (j === 'timestamp') {
        return parseTime(v[j]);
      } else {
        return v[j];
      }
    }));
  }
export const handleExportExcel = (thArray, fieldArray, tableData, filename) => {
  const data = formatJson(fieldArray, tableData);
 //  this.tableData
   export_json_to_excel({
     header: thArray, // 表头 必填
     data, // 具体数据 必填
     filename: filename, // 非必填
     autoWidth: true, // 非必填
     bookType: 'xlsx' // 非必填
   });
};
