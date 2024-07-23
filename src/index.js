//import { data } from "./data.js";

window.loadData = (json) => {
  const data = JSON.parse(json);

  const dt = new DataTable("#table", {
    data: data,
    paging: false,
    fixedHeader: true,
    scrollCollapse: true,
    scrollY: "400px",
    layout: {
      top1: "searchBuilder",
    },
    columns: [
      {
        data: "fieldData.NameFirst",
        name: "NameFirst",
        title: "First Name",
      },      {
        data: "fieldData.NameLast",
        name: "NameLast",
        title: "Last Name",
      },
      {
        data: "fieldData.DateFormatted",
        title: "Date",
        name: "Date",
        type: "date",
      },
      {
        data: "fieldData.programFY",
        title: "Program FY",
        name: "programFY",
      },
      {
        data: "fieldData.Type",
        title: "Type",
        name: "Type",
      },
      {
        data: "fieldData.Status",
        title: "Status",
        name: "Status",
      },
      {
        data: "fieldData.Description",
        title: "Description",
        name: "Description",
      },
      {
        data: "fieldData.Note",
        title: "Note",
        name: "Note",
      }
    ],

    columnDefs: [{ type: "de_date", targets: 2 }],
  });

  $(".dataTable").on("click", "tbody tr", function () {
    let build = {
      data: dt.row(this).data().fieldData,
      mode: "navigateBarrier",
    };
    FileMaker.PerformScriptWithOption(
      "Manage: Data Report",
      JSON.stringify(build),
      "0"
    );;
  });


  window.getDetails = function () {
    const result = {
      mode: "storeData",
      data: dt.searchBuilder.getDetails(),
    };
    FileMaker.PerformScriptWithOption(
      "Manage: Data Report",
      JSON.stringify(result),
      0
    );
  };

  window.rebuild = function (stored) {
    dt.searchBuilder.rebuild(JSON.parse(stored));
  };

  document.querySelectorAll("a.toggle-vis").forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();

      let columnIdx = e.target.getAttribute("data-column");
      let column = dt.column(columnIdx);

      // Toggle the visibility
      column.visible(!column.visible());
    });
  });

  window.exportFM = function () {
    let dataExport = dt.buttons.exportData({ columns: ":visible" });
    let build = {
      dataExport: dataExport,
      mode: "dataExport",
    };
    console.log(build);
    FileMaker.PerformScriptWithOption(
      "Manage: Data Report",
      JSON.stringify(build),
      "0"
    );
  };
};
