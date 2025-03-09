

import { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

//import Sidebar from "../components/Sidebar/Sidebar";
//import Topbar from "../components/Topbar";

const Partos = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los datos
    fetch("http://localhost:4000/getternero")
      .then((response) => response.json())
      .then((data) => {
        // Agrupar por fecha de nacimiento y contar los terneros por fecha
        const birthCount = data.reduce((acc, item) => {
          const date = new Date(item.nacimiento).getTime();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        // Crear un arreglo de datos formateados
        const formattedData = Object.entries(birthCount).map(([date, count]) => ({
          nacimiento: Number(date),
          value: count, // El valor es el conteo de terneros para esa fecha
        }));

        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return; // Espera a que los datos sean cargados

    const root = am5.Root.new(chartRef.current);

    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme,
      am5themes_Responsive.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minorLabelsEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.set("minorDateFormats", {
      day: "dd",
      month: "MM",
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 0, // Mínimo del eje Y
        max: 4, // Mínimo del eje
        strictMinMax: true,
        extraMin: 0.1,
        extraMax: 0.1,
        numberFormat: "#",
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "nacimiento", // Usamos 'nacimiento' como la categoría
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Set the color and width of the columns
    series.columns.template.setAll({
      fill: am5.color(0x808080), // Gris claro para las barras
      stroke: am5.color(0x505050), // Gris oscuro para el borde
      strokeOpacity: 1, // Hacer el borde completamente visible
      strokeWidth: 1, // Aumentar el grosor del borde para que sea más visible
      width: am5.percent(95), // Aumentar aún más el ancho de las columnas
      cornerRadiusTL: 6, // Bordes redondeados con un poco más de radio
      cornerRadiusTR: 6,
    });
    

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <>
    
        <h3 className="chartTitle">Fechas de Partos</h3>
      <div className="container">
        <div
          id="chartdiv"
          ref={chartRef}
          style={{ width: "110%", height: "390px", margin: "10px", marginTop: "0px" }}
        ></div>
      </div>
    </>
  );
};

export default Partos;

/*
import { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Partos = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los datos
    fetch("http://localhost:4000/getternero")
      .then((response) => response.json())
      .then((data) => {
        // Asumiendo que `data` contiene un array de objetos con el campo `nacimiento`
        const formattedData = data.map((item) => ({
          nacimiento: new Date(item.nacimiento).getTime(),
          value: 1, // Cada nacimiento tiene el valor 1 en el eje Y
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return; // Espera a que los datos sean cargados

    const root = am5.Root.new(chartRef.current);

    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme,
      am5themes_Responsive.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minorLabelsEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.set("minorDateFormats", {
      day: "dd",
      month: "MM",
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 0.5, // Mínimo del eje Y para evitar el -1
        max: 2,   // Máximo del eje Y
        strictMinMax: true,
        extraMin: 0.1,
        extraMax: 0.1,
        numberFormat: "#",
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "nacimiento", // Usamos 'nacimiento' como la categoría
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Set the color and width of the columns
    series.columns.template.setAll({
      fill: am5.color(0x555555), // dark gray
      strokeOpacity: 0,
      strokeWidth: 2, // Ancho de las columnas
      width: am5.percent(70), // Ajusta el ancho de la columna
    });

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div
          id="chartdiv"
          ref={chartRef}
          style={{ width: "110%", height: "460px", margin: "40px", marginTop: "0px" }}
        ></div>
      </div>
    </>
  );
};

export default Partos;


/*

import { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Partos = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los datos
    fetch("http://localhost:4000/getternero")
      .then((response) => response.json())
      .then((data) => {
        // Asumiendo que `data` contiene un array de objetos con el campo `nacimiento`
        const formattedData = data.map((item) => ({
          nacimiento: new Date(item.nacimiento).getTime(),
          value: Math.random() * 2 + 1, // Genera un valor entre 1 y 3
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return; // Espera a que los datos sean cargados

    const root = am5.Root.new(chartRef.current);

    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme,
      am5themes_Responsive.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minorLabelsEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.set("minorDateFormats", {
      day: "dd",
      month: "MM",
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 1,  // Mínimo del eje Y
        max: 3,  // Máximo del eje Y
        strictMinMax: true,
        extraMin: 1,
        extraMax: 1,
        numberFormat: "#",
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "nacimiento", // Usamos 'nacimiento' como la categoría
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Set the color of the columns to dark gray
    series.columns.template.setAll({
      fill: am5.color(0x555555), // dark gray
      strokeOpacity: 0,
    });

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div
          id="chartdiv"
          ref={chartRef}
          style={{ width: "110%", height: "460px", margin: "40px", marginTop: "0px" }}
        ></div>
      </div>
    </>
  );
};

export default Partos;



/*
import { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Partos = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los datos
    fetch("http://localhost:4000/getternero")
      .then((response) => response.json())
      .then((data) => {
        // Asumiendo que `data` contiene un array de objetos con el campo `nacimiento`
        const formattedData = data.map((item) => ({
          nacimiento: new Date(item.nacimiento).getTime(),
          value: Math.random() * 100, // Ejemplo: se genera un valor aleatorio
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return; // Espera a que los datos sean cargados

    const root = am5.Root.new(chartRef.current);

    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme,
      am5themes_Responsive.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minorLabelsEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.set("minorDateFormats", {
      day: "dd",
      month: "MM",
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "nacimiento", // Usamos 'nacimiento' como la categoría
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Set the color of the columns to dark gray
    series.columns.template.setAll({
      fill: am5.color(0x555555), // dark gray
      strokeOpacity: 0,
    });

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div
          id="chartdiv"
          ref={chartRef}
          style={{ width: "110%", height: "460px", margin: "40px", marginTop: "0px" }}
        ></div>
      </div>
    </>
  );
};

export default Partos;

/*
import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Partos = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const root = am5.Root.new(chartRef.current);

    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme,
      am5themes_Responsive.new(root),
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    const date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 5 + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count) {
      const data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minorLabelsEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.set("minorDateFormats", {
      day: "dd",
      month: "MM",
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Set the color of the columns to dark gray
    series.columns.template.setAll({ 
      fill: am5.color(0x555555), // dark gray
      strokeOpacity: 0 
    });

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Generate more data points for more days/months
    const data = generateDatas(90); // Generate data for 90 days (3 months)
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div
          id="chartdiv"
          ref={chartRef}
          style={{ width: "110%", height: "460px", margin:"40px", marginTop: "0px",}}
        ></div>
      </div>
    </>
  );
};

export default Partos;







/*

import  { useEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const Partos = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const root = am5.Root.new(chartRef.current);

    const myTheme = am5.Theme.new(root);
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme,
      am5themes_Responsive.new(root)
    ]);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      paddingLeft: 0
    }));

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomX"
    }));
    cursor.lineY.set("visible", false);

    const date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count) {
      const data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minorLabelsEnabled: true
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    xAxis.set("minorDateFormats", {
      "day": "dd",
      "month": "MM"
    });

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ strokeOpacity: 0 });

    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    const data = generateDatas(30);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div id="chartdiv" ref={chartRef} style={{ width: "100%", height: "500px" }}></div>
      </div>
    </>
  );
};

export default Partos;
*/