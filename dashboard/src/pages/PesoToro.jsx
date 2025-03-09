import { useLayoutEffect, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const PesoToro = () => {
  const { id } = useParams();
  const [toroData, setToroData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verificar que los datos se obtienen correctamente
        setToroData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  useLayoutEffect(() => {
    if (toroData) {
      let root = am5.Root.new('chartdiv');

      const myTheme = am5.Theme.new(root);
      myTheme.rule("AxisLabel", ["minor"]).setAll({
        dy: 1
      });
      myTheme.rule("Grid", ["minor"]).setAll({
        strokeOpacity: 0.08
      });

      root.setThemes([am5themes_Animated.new(root), myTheme]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      // Eje X como CategoryAxis en lugar de DateAxis
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50
        })
      }));

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));

      var series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Peso",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category", // Cambiar el campo del eje X
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} Kg"
        })
      }));

      series.bullets.push(() => {
        var bulletCircle = am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill")
        });
        return am5.Bullet.new(root, {
          sprite: bulletCircle
        });
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const chartData = [
        { category: "NACIMINETO", value: parseFloat(toroData?.pn) || 0 }, // PN
        { category: "DESTETE", value: parseFloat(toroData?.pd) || 0 }, // PD
        { category: "12 MESES", value: parseFloat(toroData?.p12) || 0 }, // P12
        { category: "18 MESES", value: parseFloat(toroData?.p18) || 0 }, // P18
      ];

      series.data.setAll(chartData);
      xAxis.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toroData]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <h4>Peso del Toro</h4>
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
      </div>
    </>
  );
};

export default PesoToro;


/*
import { useLayoutEffect, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const PesoToro = () => {
  const { id } = useParams();
  const [toroData, setToroData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verificar que los datos se obtienen correctamente
        setToroData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  useLayoutEffect(() => {
    if (toroData) {
      let root = am5.Root.new('chartdiv');

      const myTheme = am5.Theme.new(root);
      myTheme.rule("AxisLabel", ["minor"]).setAll({
        dy: 1
      });
      myTheme.rule("Grid", ["minor"]).setAll({
        strokeOpacity: 0.08
      });

      root.setThemes([am5themes_Animated.new(root), myTheme]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "month",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 200,
          minorLabelsEnabled: true
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));

      var series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Peso",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "month",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} Kg"
        })
      }));

      series.bullets.push(() => {
        var bulletCircle = am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill")
        });
        return am5.Bullet.new(root, {
          sprite: bulletCircle
        });
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const chartData = [
        { month: new Date(2023, 0).getTime(), value: parseFloat(toroData?.pn) || 0 }, // PN
        { month: new Date(2023, 6).getTime(), value: parseFloat(toroData?.pd) || 0 }, // PD
        { month: new Date(2024, 0).getTime(), value: parseFloat(toroData?.p12) || 0 },
        { month: new Date(2024, 6).getTime(), value: parseFloat(toroData?.p18) || 0 },
      ];

      series.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toroData]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <h4>Peso del Toro</h4>
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
      </div>
    </>
  );
};

export default PesoToro;






/*
import { useLayoutEffect, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const PesoToro = () => {
  const { id } = useParams();
  const [toroData, setToroData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verificar que los datos se obtienen correctamente
        setToroData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  useLayoutEffect(() => {
    if (toroData) {
      console.log("Toro data:", toroData);
  
      let root = am5.Root.new('chartdiv');
  
      root.setThemes([am5themes_Animated.new(root)]);
  
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
        })
      );
  
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'month', // Eje basado en categorías
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 30, // Espacio mínimo entre los valores
          }),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );
  
      xAxis.data.setAll([
        { month: 0, category: '0 Meses' },
        { month: 6, category: '6 Meses' },
        { month: 12, category: '12 Meses' },
        { month: 18, category: '18 Meses' },
      ]);

      xAxis.get('renderer').labels.template.setAll({
        text: "{category} Meses"
      });
  
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.1,
          renderer: am5xy.AxisRendererY.new(root, {}),
          min: 0, // Empieza desde 0
          strictMinMax: true, // Fuerza los límites
          title: am5.Label.new(root, { text: 'Peso (Kg)' }),
        })
      );
  
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Peso',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          categoryXField: 'month', // Usamos el campo de categoría para el eje X
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueY} Kg',
          }),
        })
      );
  
      const chartData = [
        { month: '0', value: parseFloat(toroData?.pn) || 0 }, // Convertir a número
        { month: '6', value: parseFloat(toroData?.pd) || 0 }, // Convertir a número
        { month: '12', value: parseFloat(toroData?.p12) || 0 },
        { month: '18', value: parseFloat(toroData?.p18) || 0 },
      ];
  
      console.log("Chart data:", chartData);
      series.data.setAll(chartData);
  
      series.appear(1000);
      chart.appear(1000, 100);
  
      return () => {
        root.dispose();
      };
    }
  }, [toroData]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <h4>Peso del Toro</h4>
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
      </div>
    </>
  );
};

export default PesoToro;



/*
import { useLayoutEffect, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const PesoToro = () => {
  const { id } = useParams();
  const [toroData, setToroData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verificar que los datos se obtienen correctamente
        setToroData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  useLayoutEffect(() => {
    if (toroData) {
      console.log("Toro data:", toroData);
  
      let root = am5.Root.new('chartdiv');
  
      root.setThemes([am5themes_Animated.new(root)]);
  
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
        })
      );
  
      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.2,
          renderer: am5xy.AxisRendererX.new(root, {}),
          min: 0,
          max: 18,
          strictMinMax: true, // Fuerza los límites
          title: am5.Label.new(root, { text: 'Meses' }),
        })
      );
  
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.1,
          renderer: am5xy.AxisRendererY.new(root, {}),
          min: 0, // Empieza desde 0
          strictMinMax: true, // Fuerza los límites
          title: am5.Label.new(root, { text: 'Peso (Kg)' }),
        })
      );
  
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Peso',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          valueXField: 'month',
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueY} Kg',
          }),
        })
      );
  
      const chartData = [
        { month: 0, value: parseFloat(toroData?.pn) || 0 }, // Convertir a número
        { month: 6, value: parseFloat(toroData?.pd) || 0 }, // Convertir a número
        { month: 12, value: parseFloat(toroData?.p12) || 0 },
        { month: 18, value: parseFloat(toroData?.p18) || 0 },
      ];
  
      console.log("Chart data:", chartData);
      series.data.setAll(chartData);
  
      series.appear(1000);
      chart.appear(1000, 100);
  
      return () => {
        root.dispose();
      };
    }
  }, [toroData]);
  
  

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <h4>Peso del Toro</h4>
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
      </div>
    </>
  );
};

export default PesoToro;


/*
import { useLayoutEffect, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const PesoToro = () => {
  const { id } = useParams();
  const [toroData, setToroData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verificar datos
        setToroData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  useLayoutEffect(() => {
    if (toroData) {
      let root = am5.Root.new('chartdiv');

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
        })
      );

      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.2,
          groupData: false,
          extraMax: 0.1,
          extraMin: -0.1,
          baseInterval: {
            timeUnit: 'day',
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {}),
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.1,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Peso',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          valueXField: 'date',
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueY}',
          }),
        })
      );

      // Transformar los datos obtenidos para el gráfico
      const chartData = [
        { date: new Date(toroData.nacimiento).getTime(), value: toroData.pn || 0 },
        { date: new Date(toroData.destete).getTime(), value: toroData.pd || 0 },
        { date: new Date(toroData.meses12).getTime(), value: toroData.p12 || 0 },
        { date: new Date(toroData.meses18).getTime(), value: toroData.p18 || 0 },
      ];

      series.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toroData]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <h4>Peso del Toro</h4>
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
      </div>
    </>
  );
};

export default PesoToro;


/*
import { useLayoutEffect, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

const PesoToro = () => {
  const { id } = useParams(); // Obtener el id desde la URL
  const [toroData, setToroData] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener los datos del toro
    fetch(`http://localhost:4000/gettoro/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setToroData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  useLayoutEffect(() => {
    if (toroData) {
      let root = am5.Root.new('chartdiv');

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
        })
      );

      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.2,
          groupData: false,
          extraMax: 0.1,
          extraMin: -0.1,
          baseInterval: {
            timeUnit: 'day',
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {}),
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.1,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Peso',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          valueXField: 'date',
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueY}',
          }),
        })
      );

      // Transformar los datos obtenidos para el gráfico
      const chartData = [
        { date: new Date(toroData.nacimiento).getTime(), value: toroData.pn },
        { date: new Date(toroData.destete).getTime(), value: toroData.pd },
        { date: new Date(toroData.meses12).getTime(), value: toroData.p12 },
        { date: new Date(toroData.meses18).getTime(), value: toroData.p18 },
      ];

      series.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toroData]);

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <h4>Peso del Toro</h4>
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
      </div>
    </>
  );
};

export default PesoToro;
*/