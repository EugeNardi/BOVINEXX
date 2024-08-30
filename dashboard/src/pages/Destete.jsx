import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Destete = () => {
  const [terneroData, setTerneroData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:4000/getternero")
      .then((response) => response.json())
      .then((data) => {
        setTerneroData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Create root element for the chart
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
      })
    );

    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      })
    );

    series.states.create("hidden", {
      endAngle: -90,
    });

    // Define black and grey colors
    series.get("colors").set("colors", [
      am5.color(0x000000), // Black
      am5.color(0xcccccc), // Grey
    ]);

    // Process data for the chart
    const maleCount = terneroData.filter((ternero) => ternero.genero === "MACHO").length;
    const femaleCount = terneroData.filter((ternero) => ternero.genero === "HEMBRA").length;

    // Set data with gender classification
    series.data.setAll([
      { category: "Machos", value: maleCount },
      { category: "Hembras", value: femaleCount },
    ]);

    series.appear(1000, 100);

    // Cleanup on unmount
    return () => {
      root.dispose();
    };
  }, [terneroData]);

  return (
    <>
      <Topbar />
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, paddingTop:"0px" , padding: "20px" }}>
          <h4>Genero de los terneros</h4>
          <div id="chartdiv" className="destete" style={{ width: "100%", height: "440px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Destete;


/*import { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Destete = () => {
  useEffect(() => {
    // Create root element
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
      })
    );

    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      })
    );

    series.states.create("hidden", {
      endAngle: -90,
    });

    // Define black and white colors
    series.get("colors").set("colors", [
      am5.color(0x000000), // Black
      am5.color(0xcccccc), // White
    ]);

    // Set data with gender classification
    series.data.setAll([
      { category: "Machos", value: 501.9 },
      { category: "Hembras", value: 301.9 },
      // Agregar más datos si es necesario
    ]);

    series.appear(1000, 100);

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
        <div style={{ flex: 1, paddingTop:"0px",padding: "20px" }}>
          <h3>Clasificación por Genero</h3>
          <div id="chartdiv" style={{ width: "100%", height: "420px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Destete;




import  { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Destete = () => {
  useEffect(() => {
    // Create root element
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270,
      })
    );

    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270,
      })
    );

    series.states.create("hidden", {
      endAngle: -90,
    });

    // Set data
    series.data.setAll([
      { category: "Lithuania", value: 501.9 },
      { category: "Czechia", value: 301.9 },
      { category: "Ireland", value: 201.1 },
      { category: "Germany", value: 165.8 },
      { category: "Australia", value: 139.9 },
      { category: "Austria", value: 128.3 },
      { category: "UK", value: 99 },
    ]);

    series.appear(1000, 100);

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
          <h2>Gráfico de Muestra</h2>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Destete;
*/