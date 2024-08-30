import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Servicio = () => {
  const [madreData, setMadreData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/getmadre")
      .then((response) => response.json())
      .then((data) => {
        setMadreData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Create root element for the chart
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        paddingLeft: 5,
        paddingRight: 5,
      })
    );

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    // Create axes
    let xRenderer = am5xy.AxisRendererX.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 40,
      minorGridEnabled: true,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "x",
        renderer: xRenderer,
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xRenderer.labels.template.set("forceHidden", true);

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 20,
      minorGridEnabled: true,
    });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "y",
        renderer: yRenderer,
      })
    );

    yRenderer.grid.template.setAll({
      location: 1,
    });

    yRenderer.labels.template.set("forceHidden", true);

    // Function to create series
    function makeSeries(name, color, data) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          categoryYField: "y",
          openCategoryYField: "y",
          categoryXField: "x",
          openCategoryXField: "x",
          clustered: false,
          fill: color,
          stroke: am5.color(0xffffff),
        })
      );

      series.columns.template.setAll({
        width: am5.percent(100),
        height: am5.percent(100),
        tooltipText: "RP: {rp}", // Tooltip showing the rp value
        cursorOverStyle: "pointer", // Change cursor on hover to indicate it's clickable
      });

      // Add click event to the columns
      series.columns.template.events.on("click", (ev) => {
        const id = ev.target.dataItem.dataContext.id;
        if (id) {
          window.location.href = `http://localhost:5173/madre/${id}`;
        } else {
          console.error("ID is undefined for this item:", ev.target.dataItem.dataContext);
        }
      });

      series.data.setAll(data);
      series.appear();
      legend.data.push(series);

      return series;
    }

    // Define colors for the categories based on state
    let colors = {
      preñada: am5.color(0x4d4d4d), // Gris oscuro
      vacia: am5.color(0xd3d3d3), // Gris claro
    };

    // Process data and create series
    let prenadaData = [];
    let vaciaData = [];

    madreData.forEach((madre, index) => {
      console.log(madre); // Log to inspect each madre object

      const estado = madre.estado.toLowerCase();
      const dataPoint = {
        x: Math.floor(index / 10) + 1,
        y: (index % 10) + 1,
        rp: madre.rp, // Ensure rp is included here
        id: madre._id, // Make sure this is the correct path to the id field
      };

      console.log(dataPoint); // Log the dataPoint to verify its contents

      if (estado === "preñada") {
        prenadaData.push(dataPoint);
      } else {
        vaciaData.push(dataPoint);
      }
    });

    makeSeries("Preñada", colors.preñada, prenadaData);
    makeSeries("Vacía", colors.vacia, vaciaData);

    // Set xAxis and yAxis data
    const categories = Array.from({ length: 8 }, (_, i) => ({
      x: (i + 1).toString(),
      y: (i + 1).toString(),
    }));
    xAxis.data.setAll(categories);
    yAxis.data.setAll(categories);

    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [madreData]);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingTop: "0px", padding: "20px" }}>
          <h4>Estado de las madres</h4>
          <div id="chartdiv" style={{ width: "100%", height: "340px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Servicio;


/*
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Servicio = () => {
  const [madreData, setMadreData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/getmadre")
      .then((response) => response.json())
      .then((data) => {
        setMadreData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Create root element for the chart
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        paddingLeft: 5,
        paddingRight: 5,
      })
    );

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    // Create axes
    let xRenderer = am5xy.AxisRendererX.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 40,
      minorGridEnabled: true,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "x",
        renderer: xRenderer,
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xRenderer.labels.template.set("forceHidden", true);

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 20,
      minorGridEnabled: true,
    });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "y",
        renderer: yRenderer,
      })
    );

    yRenderer.grid.template.setAll({
      location: 1,
    });

    yRenderer.labels.template.set("forceHidden", true);

    // Function to create series
    function makeSeries(name, color, data) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          categoryYField: "y",
          openCategoryYField: "y",
          categoryXField: "x",
          openCategoryXField: "x",
          clustered: false,
          fill: color,
          stroke: am5.color(0xffffff),
        })
      );

      series.columns.template.setAll({
        width: am5.percent(100),
        height: am5.percent(100),
        tooltipText: "RP: {rp}", // Tooltip showing the rp value
      });

      series.data.setAll(data);
      series.appear();
      legend.data.push(series);

      return series;
    }

    // Define colors for the categories based on state
    let colors = {
      preñada: am5.color(0x4d4d4d), // Gris oscuro
      vacia: am5.color(0xd3d3d3), // Gris claro
    };

    // Process data and create series
    let prenadaData = [];
    let vaciaData = [];

    madreData.forEach((madre, index) => {
      const estado = madre.estado.toLowerCase();
      const dataPoint = {
        x: Math.floor(index / 10) + 1,
        y: (index % 10) + 1,
        rp: madre.rp, // Ensure rp is included here
      };

      if (estado === "preñada") {
        prenadaData.push(dataPoint);
      } else {
        vaciaData.push(dataPoint);
      }
    });

    makeSeries("Preñada", colors.preñada, prenadaData);
    makeSeries("Vacía", colors.vacia, vaciaData);

    // Set xAxis and yAxis data
    const categories = Array.from({ length: 8 }, (_, i) => ({
      x: (i + 1).toString(),
      y: (i + 1).toString(),
    }));
    xAxis.data.setAll(categories);
    yAxis.data.setAll(categories);

    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [madreData]);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingTop: "0px", padding: "20px" }}>
          <h4>Estado de las madres</h4>
          <div id="chartdiv" style={{ width: "100%", height: "420px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Servicio;



/*
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Servicio = () => {
  const [madreData, setMadreData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/getmadre")
      .then((response) => response.json())
      .then((data) => {
        setMadreData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Create root element for the chart
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        paddingLeft: 5,
        paddingRight: 5,
      })
    );

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    // Create axes
    let xRenderer = am5xy.AxisRendererX.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 40,
      minorGridEnabled: true,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "x",
        renderer: xRenderer,
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xRenderer.labels.template.set("forceHidden", true);

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 20,
      minorGridEnabled: true,
    });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "y",
        renderer: yRenderer,
      })
    );

    yRenderer.grid.template.setAll({
      location: 1,
    });

    yRenderer.labels.template.set("forceHidden", true);

    // Function to create series
    function makeSeries(name, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          categoryYField: "y",
          openCategoryYField: "y",
          categoryXField: "x",
          openCategoryXField: "x",
          clustered: false,
          fill: color,
          stroke: am5.color(0xffffff),
        })
      );

      series.columns.template.setAll({
        width: am5.percent(100),
        height: am5.percent(100),
      });

      series.appear();
      legend.data.push(series);

      return series;
    }

    // Define colors for the categories based on state
    let colors = {
      preñada: am5.color(0x4D4D4D), // Gris oscuro
      vacia: am5.color(0xD3D3D3),   // Gris claro
    };

    // Create series for each state
    let seriesPrenada = makeSeries("Preñada", colors.preñada);
    let seriesVacia = makeSeries("Vacía", colors.vacia);

    // Process data
    let prenadaData = [];
    let vaciaData = [];

    madreData.forEach((madre, index) => {
      const estado = madre.estado.toLowerCase();
      const dataPoint = {
        x: Math.floor(index / 10) + 1,
        y: (index % 10) + 1,
      };

      if (estado === "preñada") {
        prenadaData.push(dataPoint);
      } else {
        vaciaData.push(dataPoint);
      }
    });

    seriesPrenada.data.setAll(prenadaData);
    seriesVacia.data.setAll(vaciaData);

    // Set xAxis and yAxis data
    const categories = Array.from({ length: 8 }, (_, i) => ({ x: (i + 1).toString(), y: (i + 1).toString() }));
    xAxis.data.setAll(categories);
    yAxis.data.setAll(categories);

    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [madreData]);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingTop: "0px", padding: "20px" }}>
          <h4>Estado de las madres</h4>
          <div id="chartdiv" style={{ width: "100%", height: "420px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Servicio;


/*
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Servicio = () => {
  const [madreData, setMadreData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/getmadre")
      .then((response) => response.json())
      .then((data) => {
        setMadreData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Create root element for the chart
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "panY",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 20,
    });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: "category",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "category",
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "x",
        categoryYField: "y",
        valueField: "value",
      })
    );

    // Define column settings with white borders and slight spacing
    series.columns.template.setAll({
      stroke: am5.color(0xffffff), // Bordes blancos
      strokeOpacity: 1,
      strokeWidth: 1,
      width: am5.percent(98),  // Muy pequeña separación entre celdas
      height: am5.percent(98), // Muy pequeña separación entre celdas
      templateField: "columnSettings",
    });

    // Define colors for the categories based on state
    let colors = {
      preñada: am5.color(0x4D4D4D), // Gris oscuro
      vacia: am5.color(0xD3D3D3),   // Gris claro
    };

    // Process data for the chart
    let data = [];
    madreData.forEach((madre) => {
      const estado = madre.estado.toLowerCase(); // Assuming estado is either 'Preñada' or 'Vacía'
      const color = estado === "preñada" ? colors.preñada : colors.vacia;

      data.push({
        y: madre.rp, // Use the 'rp' field for the y-axis labels
        x: estado.charAt(0).toUpperCase() + estado.slice(1),
        columnSettings: {
          fill: color,
        },
        value: 1, // Each cow gets a single cell
      });
    });

    series.data.setAll(data);

    // Set data for axes
    yAxis.data.setAll(madreData.map((madre) => ({ category: madre.rp })));
    xAxis.data.setAll(["Preñada", "Vacía"].map(category => ({ category })));

    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [madreData]);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingTop: "0px", padding: "20px" }}>
          <h4>Estado de las madres</h4>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Servicio;

/*import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Servicio = () => {
  const [madreData, setMadreData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/getmadre")
      .then((response) => response.json())
      .then((data) => {
        setMadreData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Create root element for the chart
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "panY",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 20,
    });

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: "category",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "category",
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "x",
        categoryYField: "y",
        valueField: "value",
      })
    );

    // Define column settings with white borders and slight spacing
    series.columns.template.setAll({
      stroke: am5.color(0xffffff), // Bordes blancos
      strokeOpacity: 1,
      strokeWidth: 1,
      width: am5.percent(98),  // Muy pequeña separación entre celdas
      height: am5.percent(98), // Muy pequeña separación entre celdas
      templateField: "columnSettings",
    });

    // Define colors for the categories based on state
    let colors = {
      preñada: am5.color(0x4D4D4D), // Gris oscuro
      vacia: am5.color(0xD3D3D3),   // Gris claro
    };

    // Process data for the chart
    let data = [];
    madreData.forEach((madre, index) => {
      const estado = madre.estado.toLowerCase(); // Assuming estado is either 'Preñada' or 'Vacía'
      const color = estado === "preñada" ? colors.preñada : colors.vacia;

      data.push({
        y: "Vaca " + (index + 1), // Label unique for each cow
        x: estado.charAt(0).toUpperCase() + estado.slice(1),
        columnSettings: {
          fill: color,
        },
        value: 1, // Each cow gets a single cell
      });
    });

    series.data.setAll(data);

    // Set data for axes
    yAxis.data.setAll(madreData.map((_, index) => ({ category: "Vaca " + (index + 1) })));
    xAxis.data.setAll(["Preñada", "Vacía"].map(category => ({ category })));

    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [madreData]);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingTop: "0px", padding: "20px" }}>
          <h4>Estado de las madres</h4>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Servicio;



/*
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Servicio = () => {
  const [madreData, setMadreData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/getmadre")
      .then((response) => response.json())
      .then((data) => {
        setMadreData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Create root element for the chart
    let root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 10,
      inversed: true,
      minorGridEnabled: true,
    });

    yRenderer.grid.template.set("visible", false);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: "category",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 10,
      inversed: true,
      stroke: am5.color(0xffffff),
      minorGridEnabled: true,
    });

    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "category",
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "x",
        categoryYField: "y",
        valueField: "value",
      })
    );

    // Define column settings with white borders and slight spacing
    series.columns.template.setAll({
      stroke: am5.color(0xffffff), // Bordes blancos
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(98),  // Muy pequeña separación entre celdas
      height: am5.percent(98), // Muy pequeña separación entre celdas
      templateField: "columnSettings",
    });

    // Define colors for the categories based on state
    let colors = {
      preñada: am5.color(0x4D4D4D), // Gris oscuro
      vacia: am5.color(0xD3D3D3),   // Gris claro
    };

    // Process data for the chart
    let data = [];
    const categories = ["Preñada", "Vacía"];
    madreData.forEach((madre) => {
      const estado = madre.estado.toLowerCase(); // Assuming estado is either 'Preñada' or 'Vacía'
      const color = estado === "preñada" ? colors.preñada : colors.vacia;

      data.push({
        y: estado.charAt(0).toUpperCase() + estado.slice(1),
        x: estado.charAt(0).toUpperCase() + estado.slice(1),
        columnSettings: {
          fill: color,
        },
        value: Math.floor(Math.random() * 100), // Assuming a value; replace with actual if available
      });
    });

    series.data.setAll(data);

    yAxis.data.setAll(categories.map(category => ({ category })));
    xAxis.data.setAll(categories.map(category => ({ category })));

    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [madreData]);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingTop: "0px", padding: "20px" }}>
          <h4>Estado de las madres</h4>
          <div id="chartdiv" style={{ width: "100%", height: "440px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Servicio;


/*import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Servicio = () => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 10,
      inversed: true,
      minorGridEnabled: true,
    });

    yRenderer.grid.template.set("visible", false);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: "category",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 10,
      inversed: true,
      stroke: am5.color(0xffffff),
      minorGridEnabled: true,
    });

    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "category",
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "x",
        categoryYField: "y",
        valueField: "value",
      })
    );

    // Define column settings, slight spacing between cells and white borders
    series.columns.template.setAll({
      stroke: am5.color(0xffffff), // Bordes blancos
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(98),  // Muy pequeña separación entre celdas
      height: am5.percent(98), // Muy pequeña separación entre celdas
      templateField: "columnSettings",
    });

    // Define colors for the categories
    let colors = {
      preñada: am5.color(0x4D4D4D), // Gris oscuro
      vacia: am5.color(0xD3D3D3),   // Gris claro
    };

    // Update the data for the two categories with more cells
    let data = [];
    const categories = ["Preñada", "Vacía"];
    for (let i = 0; i < 3; i++) { // Incrementa el número de celdas por 3
      categories.forEach((yCategory) => {
        categories.forEach((xCategory) => {
          data.push({
            y: yCategory,
            x: xCategory,
            columnSettings: {
              fill: yCategory === "Preñada" ? colors.preñada : colors.vacia,
            },
            value: Math.floor(Math.random() * 100), // Valores aleatorios
          });
        });
      });
    }

    series.data.setAll(data);

    yAxis.data.setAll(categories.map(category => ({ category })));
    xAxis.data.setAll(categories.map(category => ({ category })));

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </div>
    </>
  );
};

export default Servicio;


/*import  { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Servicio = () => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
      minorGridEnabled: true,
    });

    yRenderer.grid.template.set("visible", false);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: "category",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 30,
      inversed: true,
      minorGridEnabled: true,
    });

    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "category",
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        stroke: am5.color(0xffffff),
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "x",
        categoryYField: "y",
        valueField: "value",
      })
    );

    series.columns.template.setAll({
      tooltipText: "{value}",
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(100),
      height: am5.percent(100),
      templateField: "columnSettings",
    });

    // Define colors for the categories
    let colors = {
      preñada: am5.color(0x4d4d4d), // Gris oscuro
      vacia: am5.color(0xffffff),   // Blanco
    };

    // Update the data for the two categories
    let data = [
      {
        y: "Preñada",
        x: "Preñada",
        columnSettings: {
          fill: colors.preñada,
        },
        value: 20,
      },
      {
        y: "Vacía",
        x: "Vacía",
        columnSettings: {
          fill: colors.vacia,
        },
        value: 15,
      },
      {
        y: "Preñada",
        x: "Vacía",
        columnSettings: {
          fill: colors.preñada,
        },
        value: 25,
      },
      {
        y: "Vacía",
        x: "Preñada",
        columnSettings: {
          fill: colors.vacia,
        },
        value: 15,
      },
    ];

    series.data.setAll(data);

    yAxis.data.setAll([
      { category: "Preñada" },
      { category: "Vacía" },
    ]);

    xAxis.data.setAll([
      { category: "Preñada" },
      { category: "Vacía" },
    ]);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </div>
    </>
  );
};

export default Servicio;

/*

import  { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Servicio = () => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
      minorGridEnabled: true,
    });

    yRenderer.grid.template.set("visible", false);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: "category",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 30,
      inversed: true,
      minorGridEnabled: true,
    });

    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "category",
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        stroke: am5.color(0xffffff),
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "x",
        categoryYField: "y",
        valueField: "value",
      })
    );

    series.columns.template.setAll({
      tooltipText: "{value}",
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(100),
      height: am5.percent(100),
      templateField: "columnSettings",
    });

    let circleTemplate = am5.Template.new({});

    series.set("heatRules", [
      {
        target: circleTemplate,
        min: 10,
        max: 35,
        dataField: "value",
        key: "radius",
      },
    ]);

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(
          root,
          {
            fill: am5.color(0x000000),
            fillOpacity: 0.5,
            strokeOpacity: 0,
          },
          circleTemplate
        ),
      });
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          fill: am5.color(0xffffff),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          fontSize: 10,
          text: "{value}",
        }),
      });
    });

    let colors = {
      critical: am5.color(0xca0101),
      bad: am5.color(0xe17a2d),
      medium: am5.color(0xe1d92d),
      good: am5.color(0x5dbe24),
      verygood: am5.color(0x0b7d03),
    };

    let data = [
      {
        y: "Critical",
        x: "Very good",
        columnSettings: {
          fill: colors.medium,
        },
        value: 20,
      },
      {
        y: "Bad",
        x: "Very good",
        columnSettings: {
          fill: colors.good,
        },
        value: 15,
      },
      {
        y: "Medium",
        x: "Very good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 25,
      },
      {
        y: "Good",
        x: "Very good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 15,
      },
      {
        y: "Very good",
        x: "Very good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 12,
      },
      {
        y: "Critical",
        x: "Good",
        columnSettings: {
          fill: colors.bad,
        },
        value: 30,
      },
      {
        y: "Bad",
        x: "Good",
        columnSettings: {
          fill: colors.medium,
        },
        value: 24,
      },
      {
        y: "Medium",
        x: "Good",
        columnSettings: {
          fill: colors.good,
        },
        value: 25,
      },
      {
        y: "Good",
        x: "Good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 15,
      },
      {
        y: "Very good",
        x: "Good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 25,
      },
      {
        y: "Critical",
        x: "Medium",
        columnSettings: {
          fill: colors.bad,
        },
        value: 33,
      },
      {
        y: "Bad",
        x: "Medium",
        columnSettings: {
          fill: colors.bad,
        },
        value: 14,
      },
      {
        y: "Medium",
        x: "Medium",
        columnSettings: {
          fill: colors.medium,
        },
        value: 20,
      },
      {
        y: "Good",
        x: "Medium",
        columnSettings: {
          fill: colors.good,
        },
        value: 19,
      },
      {
        y: "Very good",
        x: "Medium",
        columnSettings: {
          fill: colors.good,
        },
        value: 25,
      },
      {
        y: "Critical",
        x: "Bad",
        columnSettings: {
          fill: colors.critical,
        },
        value: 31,
      },
      {
        y: "Bad",
        x: "Bad",
        columnSettings: {
          fill: colors.critical,
        },
        value: 24,
      },
      {
        y: "Medium",
        x: "Bad",
        columnSettings: {
          fill: colors.bad,
        },
        value: 25,
      },
      {
        y: "Good",
        x: "Bad",
        columnSettings: {
          fill: colors.medium,
        },
        value: 15,
      },
      {
        y: "Very good",
        x: "Bad",
        columnSettings: {
          fill: colors.good,
        },
        value: 15,
      },
      {
        y: "Critical",
        x: "Critical",
        columnSettings: {
          fill: colors.critical,
        },
        value: 12,
      },
      {
        y: "Bad",
        x: "Critical",
        columnSettings: {
          fill: colors.critical,
        },
        value: 14,
      },
      {
        y: "Medium",
        x: "Critical",
        columnSettings: {
          fill: colors.critical,
        },
        value: 15,
      },
      {
        y: "Good",
        x: "Critical",
        columnSettings: {
          fill: colors.bad,
        },
        value: 25,
      },
      {
        y: "Very good",
        x: "Critical",
        columnSettings: {
          fill: colors.medium,
        },
        value: 19,
      },
    ];

    series.data.setAll(data);

    yAxis.data.setAll([
      { category: "Critical" },
      { category: "Bad" },
      { category: "Medium" },
      { category: "Good" },
      { category: "Very good" },
    ]);

    xAxis.data.setAll([
      { category: "Critical" },
      { category: "Bad" },
      { category: "Medium" },
      { category: "Good" },
      { category: "Very good" },
    ]);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </div>
    </>
  );
};

export default Servicio;

/*
import  { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Servicio = () => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0,
        paddingRight: 0,
        layout: root.verticalLayout,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
      minorGridEnabled: true,
    });

    yRenderer.grid.template.set("visible", false);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: "category",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 30,
      inversed: true,
      minorGridEnabled: true,
    });

    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "category",
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        stroke: am5.color(0xffffff),
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "x",
        categoryYField: "y",
        valueField: "value",
      })
    );

    series.columns.template.setAll({
      tooltipText: "{value}",
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(100),
      height: am5.percent(100),
      templateField: "columnSettings",
    });

    let circleTemplate = am5.Template.new({});

    series.set("heatRules", [
      {
        target: circleTemplate,
        min: 10,
        max: 35,
        dataField: "value",
        key: "radius",
      },
    ]);

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(
          root,
          {
            fill: am5.color(0x000000),
            fillOpacity: 0.5,
            strokeOpacity: 0,
          },
          circleTemplate
        ),
      });
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          fill: am5.color(0xffffff),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          fontSize: 10,
          text: "{value}",
        }),
      });
    });

    let colors = {
      critical: am5.color(0xca0101),
      bad: am5.color(0xe17a2d),
      medium: am5.color(0xe1d92d),
      good: am5.color(0x5dbe24),
      verygood: am5.color(0x0b7d03),
    };

    let data = [
      {
        y: "Critical",
        x: "Very good",
        columnSettings: {
          fill: colors.medium,
        },
        value: 20,
      },
      {
        y: "Bad",
        x: "Very good",
        columnSettings: {
          fill: colors.good,
        },
        value: 15,
      },
      {
        y: "Medium",
        x: "Very good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 25,
      },
      {
        y: "Good",
        x: "Very good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 15,
      },
      {
        y: "Very good",
        x: "Very good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 12,
      },
      {
        y: "Critical",
        x: "Good",
        columnSettings: {
          fill: colors.bad,
        },
        value: 30,
      },
      {
        y: "Bad",
        x: "Good",
        columnSettings: {
          fill: colors.medium,
        },
        value: 24,
      },
      {
        y: "Medium",
        x: "Good",
        columnSettings: {
          fill: colors.good,
        },
        value: 25,
      },
      {
        y: "Good",
        x: "Good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 15,
      },
      {
        y: "Very good",
        x: "Good",
        columnSettings: {
          fill: colors.verygood,
        },
        value: 25,
      },
      {
        y: "Critical",
        x: "Medium",
        columnSettings: {
          fill: colors.bad,
        },
        value: 33,
      },
      {
        y: "Bad",
        x: "Medium",
        columnSettings: {
          fill: colors.bad,
        },
        value: 14,
      },
      {
        y: "Medium",
        x: "Medium",
        columnSettings: {
          fill: colors.medium,
        },
        value: 20,
      },
      {
        y: "Good",
        x: "Medium",
        columnSettings: {
          fill: colors.good,
        },
        value: 19,
      },
      {
        y: "Very good",
        x: "Medium",
        columnSettings: {
          fill: colors.good,
        },
        value: 25,
      },
      {
        y: "Critical",
        x: "Bad",
        columnSettings: {
          fill: colors.critical,
        },
        value: 31,
      },
      {
        y: "Bad",
        x: "Bad",
        columnSettings: {
          fill: colors.critical,
        },
        value: 24,
      },
      {
        y: "Medium",
        x: "Bad",
        columnSettings: {
          fill: colors.bad,
        },
        value: 25,
      },
      {
        y: "Good",
        x: "Bad",
        columnSettings: {
          fill: colors.medium,
        },
        value: 15,
      },
      {
        y: "Very good",
        x: "Bad",
        columnSettings: {
          fill: colors.good,
        },
        value: 15,
      },
      {
        y: "Critical",
        x: "Critical",
        columnSettings: {
          fill: colors.critical,
        },
        value: 12,
      },
      {
        y: "Bad",
        x: "Critical",
        columnSettings: {
          fill: colors.critical,
        },
        value: 14,
      },
      {
        y: "Medium",
        x: "Critical",
        columnSettings: {
          fill: colors.critical,
        },
        value: 15,
      },
      {
        y: "Good",
        x: "Critical",
        columnSettings: {
          fill: colors.bad,
        },
        value: 25,
      },
      {
        y: "Very good",
        x: "Critical",
        columnSettings: {
          fill: colors.medium,
        },
        value: 19,
      },
    ];

    series.data.setAll(data);

    yAxis.data.setAll([
      { category: "Critical" },
      { category: "Bad" },
      { category: "Medium" },
      { category: "Good" },
      { category: "Very good" },
    ]);

    xAxis.data.setAll([
      { category: "Critical" },
      { category: "Bad" },
      { category: "Medium" },
      { category: "Good" },
      { category: "Very good" },
    ]);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </div>
    </>
  );
};

export default Servicio;


/*

import  { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Servicio = () => {
  useEffect(() => {
    // Create root element
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        paddingLeft: 5,
        paddingRight: 5
      })
    );

    // Add legend
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );

    // Create axes
    var xRenderer = am5xy.AxisRendererX.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 40,
      minorGridEnabled: true
    });
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "x",
      renderer: xRenderer
    }));
    
    xRenderer.grid.template.setAll({
      location: 1
    });

    xRenderer.labels.template.set("forceHidden", true);

    xAxis.data.setAll([{ x: "1" }, { x: "2" }, { x: "3" }, { x: "4" }, { x: "5" }, { x: "6" }, { x: "7" }, { x: "8" }, { x: "9" }, { x: "10" }]);

    var yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 20,
      minorGridEnabled: true
    });

    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "y",
      renderer: yRenderer
    }));

    yRenderer.grid.template.setAll({
      location: 1
    });

    yRenderer.labels.template.set("forceHidden", true);

    yAxis.data.setAll([{ y: "1" }, { y: "2" }, { y: "3" }, { y: "4" }, { y: "5" }, { y: "6" }, { y: "7" }, { y: "8" }, { y: "9" }, { y: "10" }]);

    // Add series
    function makeSeries(name) {
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryYField: "y",
        openCategoryYField: "y",
        categoryXField: "x",
        openCategoryXField: "x",
        clustered: false
      }));

      series.columns.template.setAll({
        width: am5.percent(100),
        height: am5.percent(100),
        stroke: am5.color(0xffffff),
      });

      series.appear();
      legend.data.push(series);

      return series;
    }

    var series1 = makeSeries("Democratic");
    series1.data.setAll([
      { x: "1", y: "1" },
      { x: "1", y: "2" },
      { x: "1", y: "3" },
      { x: "1", y: "4" },
      { x: "1", y: "5" },
      { x: "1", y: "6" },
      { x: "1", y: "7" },
      { x: "1", y: "8" },
      { x: "1", y: "9" },
      { x: "1", y: "10" },
      { x: "2", y: "1" },
      { x: "2", y: "2" },
      { x: "2", y: "3" },
      { x: "2", y: "4" },
      { x: "2", y: "5" },
      { x: "2", y: "6" },
      { x: "2", y: "7" },
      { x: "2", y: "8" },
      { x: "2", y: "9" },
      { x: "2", y: "10" },
      { x: "3", y: "1" },
      { x: "3", y: "2" },
      { x: "3", y: "3" },
    ]);

    var series2 = makeSeries("Republican");
    series2.data.setAll([
      { x: "3", y: "4" },
      { x: "3", y: "5" },
      { x: "3", y: "6" },
      { x: "3", y: "7" },
      { x: "3", y: "8" },
      { x: "3", y: "9" },
      { x: "3", y: "10" },
      { x: "4", y: "1" },
      { x: "4", y: "2" },
      { x: "4", y: "3" },
      { x: "4", y: "4" },
      { x: "4", y: "5" },
      { x: "4", y: "6" },
      { x: "4", y: "7" },
      { x: "4", y: "8" },
      { x: "4", y: "9" },
      { x: "4", y: "10" },
      { x: "5", y: "1" },
      { x: "5", y: "2" },
      { x: "5", y: "3" },
      { x: "5", y: "4" },
      { x: "5", y: "5" },
      { x: "5", y: "6" },
    ]);

    var series3 = makeSeries("Libertarian");
    series3.data.setAll([
      { x: "5", y: "7" },
      { x: "5", y: "8" },
      { x: "5", y: "9" },
      { x: "5", y: "10" },
      { x: "6", y: "1" },
      { x: "6", y: "2" },
      { x: "6", y: "3" },
      { x: "6", y: "4" },
      { x: "6", y: "5" },
      { x: "6", y: "6" },
      { x: "6", y: "7" },
      { x: "6", y: "8" },
      { x: "6", y: "9" },
      { x: "6", y: "10" },
      { x: "7", y: "1" },
      { x: "7", y: "2" },
      { x: "7", y: "3" },
      { x: "7", y: "4" },
      { x: "7", y: "5" },
      { x: "7", y: "6" },
      { x: "7", y: "7" },
      { x: "7", y: "8" },
      { x: "7", y: "9" },
    ]);

    // Make stuff animate on load
    chart.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Gráfico XY de Muestra</h2>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Servicio;
*/