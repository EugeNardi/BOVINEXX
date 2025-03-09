


import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import QRCode from "qrcode.react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { IconButton } from '@mui/material';
import { GetApp } from '@mui/icons-material'; // Icono de descarga
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then((response) => {
      response.json().then((toros) => {
        setToros(toros);
      });
    });
  }, [id]);
 
  useLayoutEffect(() => {
    if (toros) {
      let root = am5.Root.new('chartdiv');
      root.setThemes([am5themes_Animated.new(root)]);
  
      const chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 50,
        paddingLeft: 0,
        paddingRight: 0,
      }));
  
      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);
  
      const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
        })
      }));
  
      const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));
  
      const series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Peso",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        stroke: am5.color(0x000000),  // Cambiar color de la línea a negro
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} Kg",
          getFillFromSprite: false,
          getStrokeFromSprite: false,
          fill: am5.color(0x000000),  // Fondo del tooltip en negro
          stroke: am5.color(0x000000), // Borde del tooltip en negro
          strokeWidth: 2,              // Ancho del borde del tooltip
        })
      }));
      
      // Cambiar el color de los puntos (bullets) a negro
      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0x000000) // Color negro para los puntos
          })
        });
      });
  
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));
  
      const chartData = [
        { category: "NACIMIENTO", value: parseFloat(toros?.pn) || 0 },
        { category: "DESTETE", value: parseFloat(toros?.pd) || 0 },
        { category: "12 MESES", value: parseFloat(toros?.p12) || 0 },
        { category: "18 MESES", value: parseFloat(toros?.p18) || 0 },
      ];
  
      series.data.setAll(chartData);
      xAxis.data.setAll(chartData);
  
      series.appear(1000);
      chart.appear(1000, 100);
  
      return () => {
        root.dispose();
      };
    }
  }, [toros]);
  
  

  
  const downloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    let yOffset = 20;
  
    // Añadir la imagen del toro al PDF
    if (toros && toros.image) {
      const img = new Image();
      img.src = `http://localhost:4000/${toros.image}`;
      await new Promise((resolve) => {
        img.onload = () => {
          const imgWidth = pageWidth * 0.4; // Ajustar el ancho de la imagen
          const imgHeight = (img.height * imgWidth) / img.width;
          doc.addImage(img, 'JPEG', 10, yOffset, imgWidth, imgHeight);
          yOffset += imgHeight + 10; // Espacio debajo de la imagen
          resolve();
        };
      });
    }
  
    // Añadir detalles al PDF
    const details = [
      { label: 'RP:', value: toros.rp },
      { label: 'Nacimiento:', value: toros.nacimiento.split('T')[0] },
      { label: 'Padre:', value: toros.padre },
      { label: 'Madre:', value: toros.madre },
      { label: 'Peso al Nacimiento (Kg):', value: toros.pn },
      { label: 'Peso al Destete (Kg):', value: toros.pd },
      { label: 'Peso 12 meses (Kg):', value: toros.p12 },
      { label: 'Peso 18 meses (Kg):', value: toros.p18 },
      { label: 'Circunferencia 12 Meses (Cm):', value: toros.ce12 },
      { label: 'Circunferencia 18 Meses (Cm):', value: toros.ce18 },
      { label: 'Circunferencia Escrotal (Cm):', value: toros.ce },
      { label: 'Inmunizado:', value: toros.inmunizado },
    ];
  
    // Establecer estilo de texto
    doc.setFontSize(12); // Aumentar tamaño de fuente a 12
    const columnWidth = (pageWidth - 20) / 2; // Ancho para cada columna
  
    // Añadir detalles en dos columnas
    details.forEach((detail, index) => {
      const x = index % 2 === 0 ? 10 : columnWidth + 10; // Alternar entre columnas
      const y = yOffset + Math.floor(index / 2) * 10; // Ajustar la altura para cada par
      doc.text(x, y, `${detail.label} ${detail.value}`);
    });
  
    // Espacio para el código QR
    yOffset += Math.ceil(details.length / 2) * 10 + 10; // Ajustar el yOffset para el código QR
  
    // Renderizar código QR en el PDF
    const qrCanvas = document.querySelector(".qr-code-container canvas");
    if (qrCanvas) {
      const qrImage = qrCanvas.toDataURL("image/png");
      doc.addImage(qrImage, "PNG", pageWidth - 60, 20, 50, 50); // Posición en la esquina superior derecha
    }
  
    // Capturar el gráfico y añadirlo al PDF
    const chartElement = document.getElementById('chartdiv');
    if (chartElement) {
      const chartCanvas = await html2canvas(chartElement, { scale: 2 }); // Captura el gráfico con más calidad
      const chartDataURL = chartCanvas.toDataURL('image/png');
      const imgWidth = pageWidth - 20;
      const imgHeight = (chartCanvas.height * imgWidth) / chartCanvas.width;
      doc.addImage(chartDataURL, 'PNG', 10, yOffset + 10, imgWidth, imgHeight);
    }
  
    // Guardar el PDF
    doc.save(`Toro_${toros.rp}.pdf`);
  };
  
  

  if (!toros) return "";

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          
          <div className="download-button-container">
            <IconButton
              onClick={downloadPDF}
              style={{ position: 'absolute', top: 10, right: 10, color: 'black' }}
            >
              <GetApp fontSize="large" />
            </IconButton>
          </div>

          <div className="image-qr-row">
            <div className="image-container">
              {toros.image && (
                <img
                  src={`http://localhost:4000/${toros.image}`}
                  alt="Toro"
                  className="toro-image"
                />
              )}
            </div>
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>

          <div className="details-grid">
            <div className="detail">
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>

            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>

            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>

            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>

            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>

            <div className="detail">
              <span className="label">Madre:</span>
              <span className="value">{toros.madre}</span>
            </div>

            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>

            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>




            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
                    
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>

          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Toro;



/*

  useLayoutEffect(() => {
    if (toros) {
      let root = am5.Root.new('chartdiv');
      root.setThemes([am5themes_Animated.new(root)]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 50,
        paddingLeft: 0,
        paddingRight: 0,
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
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
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} Kg"
        })
     
      }));
      

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const chartData = [
        { category: "NACIMIENTO", value: parseFloat(toros?.pn) || 0 },
        { category: "DESTETE", value: parseFloat(toros?.pd) || 0 },
        { category: "12 MESES", value: parseFloat(toros?.p12) || 0 },
        { category: "18 MESES", value: parseFloat(toros?.p18) || 0 },
      ];

      series.data.setAll(chartData);
      xAxis.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toros]);

/*
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import QRCode from "qrcode.react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { IconButton } from '@mui/material';
import { GetApp } from '@mui/icons-material'; // Icono de descarga
import { jsPDF } from "jspdf";

import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then((response) => {
      response.json().then((toros) => {
        setToros(toros);
      });
    });
  }, [id]);

  useLayoutEffect(() => {
    if (toros) {
      let root = am5.Root.new('chartdiv');
      root.setThemes([am5themes_Animated.new(root)]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 50,
        paddingLeft: 0,
        paddingRight: 0,
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
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
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} Kg"
        })
      }));

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const chartData = [
        { category: "NACIMIENTO", value: parseFloat(toros?.pn) || 0 },
        { category: "DESTETE", value: parseFloat(toros?.pd) || 0 },
        { category: "12 MESES", value: parseFloat(toros?.p12) || 0 },
        { category: "18 MESES", value: parseFloat(toros?.p18) || 0 },
      ];

      series.data.setAll(chartData);
      xAxis.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toros]);

  const downloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yOffset = 20;

    // Añadir la imagen del toro al PDF
    if (toros && toros.image) {
      const img = new Image();
      img.src = `http://localhost:4000/${toros.image}`;
      await new Promise((resolve) => {
        img.onload = () => {
          // Ajustar la imagen para que se vea bien en la hoja
          const imgWidth = pageWidth * 0.5; // 50% del ancho de la hoja
          const imgHeight = (img.height * imgWidth) / img.width;
          doc.addImage(img, 'JPEG', 10, yOffset, imgWidth, imgHeight);
          yOffset += imgHeight + 10; // Dejar espacio debajo de la imagen
          resolve();

          console.log(pageHeight);
          
        };
      });
    }

    // Añadir detalles al PDF con mejor formato
    const details = [
      { label: 'RP:', value: toros.rp },
      { label: 'Nacimiento:', value: toros.nacimiento.split('T')[0] },
      { label: 'Padre:', value: toros.padre },
      { label: 'Peso al Nacimiento (Kg):', value: toros.pn },
      { label: 'Peso al Destete (Kg):', value: toros.pd },
      { label: 'Peso 12 meses (Kg):', value: toros.p12 },
      { label: 'Peso 18 meses (Kg):', value: toros.p18 },
      { label: 'Circunferencia 12 Meses (Cm):', value: toros.ce12 },
      { label: 'Circunferencia 18 Meses (Cm):', value: toros.ce18 },
      { label: 'Circunferencia Escrotal (Cm):', value: toros.ce },
      { label: 'Inmunizado:', value: toros.inmunizado }
    ];

    // Establecer estilo de texto
    doc.setFontSize(12);
    details.forEach((detail) => {
      doc.text(10, yOffset, `${detail.label} ${detail.value}`);
      yOffset += 10; // Espacio entre líneas
    });

    // Renderizar código QR en el PDF
    const qrCanvas = document.querySelector(".qr-code-container canvas");
    if (qrCanvas) {
      const qrImage = qrCanvas.toDataURL("image/png");
      doc.addImage(qrImage, "PNG", pageWidth - 60, 20, 50, 50); // Posición en la esquina superior derecha
    }

    // Guardar el PDF con mejor calidad
    doc.save(`Toro_${toros.rp}.pdf`);
  };

  if (!toros) return "";

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          
          <div className="download-button-container">
            <IconButton
              onClick={downloadPDF}
              style={{ position: 'absolute', top: 10, right: 10, color: 'black' }}
            >
              <GetApp fontSize="large" />
            </IconButton>
          </div>

          <div className="image-qr-row">
            <div className="image-container">
              {toros.image && (
                <img
                  src={`http://localhost:4000/${toros.image}`}
                  alt="Toro"
                  className="toro-image"
                />
              )}
            </div>
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>

          <div className="details-grid">
            <div className="detail">
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>

          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Toro;



/*
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import QRCode from "qrcode.react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { IconButton } from '@mui/material';
import { GetApp } from '@mui/icons-material'; // Icono de descarga
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then((response) => {
      response.json().then((toros) => {
        setToros(toros);
      });
    });
  }, [id]);

  useLayoutEffect(() => {
    if (toros) {
      let root = am5.Root.new('chartdiv');
      root.setThemes([am5themes_Animated.new(root)]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 50,
        paddingLeft: 0,
        paddingRight: 0,
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
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
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} Kg"
        })
      }));

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const chartData = [
        { category: "NACIMIENTO", value: parseFloat(toros?.pn) || 0 },
        { category: "DESTETE", value: parseFloat(toros?.pd) || 0 },
        { category: "12 MESES", value: parseFloat(toros?.p12) || 0 },
        { category: "18 MESES", value: parseFloat(toros?.p18) || 0 },
      ];

      series.data.setAll(chartData);
      xAxis.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toros]);

  const downloadPDF = async () => {
    const element = document.querySelector('.box');

    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Toro_${toros.rp}.pdf`);
    }
  };

  if (!toros) return "";

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
   
          <div className="download-button-container">
            <IconButton
              onClick={downloadPDF}
              style={{ position: 'absolute', top: 10, right: 10, color: 'black' }}
            >
              <GetApp fontSize="large" />
            </IconButton>
          </div>

          <div className="image-qr-row">
            <div className="image-container">
              {toros.image && (
                <img
                  src={`http://localhost:4000/${toros.image}`}
                  alt="Toro"
                  className="toro-image"
                />
              )}
            </div>
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>

          <div className="details-grid">
            <div className="detail">
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>

          <div id="chartdiv" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
        </div>
      </div>
    </>
  );
};

export default Toro;



/*

import { useState, useEffect, useLayoutEffect } from "react";
import { useParams} from "react-router-dom";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import QRCode from "qrcode.react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { GetApp } from '@mui/icons-material';
import { jsPDF } from "jspdf";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then((response) => {
      response.json().then((toros) => {
        setToros(toros);
      });
    });
  }, [id]);

  useLayoutEffect(() => {
    if (toros) {
      let root = am5.Root.new('chartdiv');
      root.setThemes([am5themes_Animated.new(root)]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 50,
        paddingLeft: 0,
        paddingRight: 0,
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
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
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} Kg"
        })
      }));

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const chartData = [
        { category: "NACIMIENTO", value: parseFloat(toros?.pn) || 0 },
        { category: "DESTETE", value: parseFloat(toros?.pd) || 0 },
        { category: "12 MESES", value: parseFloat(toros?.p12) || 0 },
        { category: "18 MESES", value: parseFloat(toros?.p18) || 0 },
      ];

      series.data.setAll(chartData);
      xAxis.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toros]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`RP: ${toros.rp}`, 10, 10);
    doc.text(`Nacimiento: ${toros.nacimiento.split('T')[0]}`, 10, 20);
    doc.text(`Padre: ${toros.padre}`, 10, 30);
    doc.text(`Peso al Nacimiento (Kg): ${toros.pn}`, 10, 40);
    doc.text(`Peso al Destete (Kg): ${toros.pd}`, 10, 50);
    doc.text(`Peso 12 meses (Kg): ${toros.p12}`, 10, 60);
    doc.text(`Peso 18 meses (Kg): ${toros.p18}`, 10, 70);
    doc.text(`Circunferencia 12 Meses (Cm): ${toros.ce12}`, 10, 80);
    doc.text(`Circunferencia 18 Meses (Cm): ${toros.ce18}`, 10, 90);
    doc.text(`Circunferencia Escrotal (Cm): ${toros.ce}`, 10, 100);
    doc.text(`Inmunizado: ${toros.inmunizado}`, 10, 110);
    doc.save(`Toro_${toros.rp}.pdf`);
  };

  if (!toros) return "";

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
      
          <div className="download-icon" onClick={downloadPDF}>
            <GetApp style={{ cursor: 'pointer', fontSize: 30, position: 'absolute', top: '10px', right: '10px' }} />
          </div>

         
          <div className="image-qr-row">
            <div className="image-container">
              {toros.image && (
                <img
                  src={`http://localhost:4000/${toros.image}`}
                  alt="Toro"
                  className="toro-image"
                />
              )}
            </div>
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>

         
          <div className="details-grid">
            <div className="detail">
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>

      
          <div id="chartdiv" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
        </div>
      </div>
    </>
  );
};

export default Toro;

/*
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams} from "react-router-dom";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import QRCode from "qrcode.react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
 
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then((response) => {
      response.json().then((toros) => {
        setToros(toros);
      });
    });
  }, [id]);

  useLayoutEffect(() => {
    if (toros) {
      let root = am5.Root.new('chartdiv');

      root.setThemes([am5themes_Animated.new(root)]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 50,
        paddingLeft: 0,
        paddingRight: 0,
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30
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
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY} Kg"
        })
      }));

      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });

      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));

      const chartData = [
        { category: "NACIMIENTO", value: parseFloat(toros?.pn) || 0 },
        { category: "DESTETE", value: parseFloat(toros?.pd) || 0 },
        { category: "12 MESES", value: parseFloat(toros?.p12) || 0 },
        { category: "18 MESES", value: parseFloat(toros?.p18) || 0 },
      ];

      series.data.setAll(chartData);
      xAxis.data.setAll(chartData);

      series.appear(1000);
      chart.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [toros]);

  if (!toros) return "";

 
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
      
          <div className="image-qr-row">
            <div className="image-container">
              {toros.image && (
                <img
                  src={`http://localhost:4000/${toros.image}`}
                  alt="Toro"
                  className="toro-image"
                />
              )}
            </div>
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>

        
          <div className="details-grid">
            <div className="detail">
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>

         
          <div id="chartdiv" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>

       
          <div className="navigate-button-container">
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Toro;



/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then((response) => {
      response.json().then((toros) => {
        setToros(toros);
      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/toros");
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-qr-container">
            <div className="image-container">
              {toros.image && (
                <img
                  src={`http://localhost:4000/${toros.image}`}
                  alt="Toro"
                  className="toro-image"
                />
              )}
            </div>
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>
          <div className="details-container">
            <div className="detail">
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>
        </div>
        <div>
        <button className="historypush" onClick={handleNavigate}>
          Lista de Toros
        </button>
       
       
    
        </div>
       
      
      </div>
    </>
  );
};

export default Toro;


/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then(response => {
      response.json().then(toros => {
        setToros(toros);
      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/toros');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-container">
            {toros.image && (
              <img src={`http://localhost:4000/${toros.image}`} alt="Toro" className="toro-image" />
            )}
          </div>
          <div className="details-container">
            <div className="detail">
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>
        </div>
          <button className="historypush" onClick={handleNavigate}>Lista de Toros</button>
      </div>
    </>
  );
}

export default Toro;



/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then(response => {
      response.json().then(toros => {
        setToros(toros);
      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/toros');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <h4>Toro Detalles</h4>
          <div className="info-container">
            <div className="image-container">
              {toros.image && (
                <img src={`http://localhost:4000/${toros.image}`} alt="Toro" className="toro-image" />
              )}
            </div>
            <div className="details-container">
              <div className="detail">
                <span className="label">RP:</span>
                <span className="value">{toros.rp}</span>
              </div>
              <div className="detail">
                <span className="label">Nacimiento:</span>
                <span className="value">{toros.nacimiento.split('T')[0]}</span>
              </div>
              <div className="detail">
                <span className="label">Padre:</span>
                <span className="value">{toros.padre}</span>
              </div>
              <div className="detail">
                <span className="label">Peso al Nacimiento (Kg):</span>
                <span className="value">{toros.pn}</span>
              </div>
              <div className="detail">
                <span className="label">Peso al Destete (Kg):</span>
                <span className="value">{toros.pd}</span>
              </div>
              <div className="detail">
                <span className="label">Peso 12 meses (Kg):</span>
                <span className="value">{toros.p12}</span>
              </div>
              <div className="detail">
                <span className="label">Peso 18 meses (Kg):</span>
                <span className="value">{toros.p18}</span>
              </div>
              <div className="detail">
                <span className="label">Circunferencia 12 Meses (Cm):</span>
                <span className="value">{toros.ce12}</span>
              </div>
              <div className="detail">
                <span className="label">Circunferencia 18 Meses (Cm):</span>
                <span className="value">{toros.ce18}</span>
              </div>
              <div className="detail">
                <span className="label">Circunferencia Escrotal (Cm):</span>
                <span className="value">{toros.ce}</span>
              </div>
              <div className="detail">
                <span className="label">Inmunizado:</span>
                <span className="value">{toros.inmunizado}</span>
              </div>
            </div>
          </div>
          <button className="historypush" onClick={handleNavigate}>Lista de Toros</button>
        </div>
      </div>
    </>
  );
}

export default Toro;


/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Toro = () => {
  
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then(response => {
      response.json().then(toros => {
        setToros(toros);
      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/toros');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">

          <div className="info-container">
            <h4>TORO DATOS</h4>
            <div className="content-wrapper">
              <table className="info-table">
                <tbody>
                  <tr>
                    <th>RP</th>
                    <td>{toros.rp}</td>
                  </tr>

                  <tr>
                    <th>Nacimiento</th>
                    <td>{toros.nacimiento.split('T')[0]}</td>
                  </tr>

                  <tr>
                    <th>Padre</th>
                    <td>{toros.padre}</td>
                  </tr>

                  <tr>
                    <th>Peso al Nacimiento (Kg)</th>
                    <td>{toros.pn}</td>
                  </tr>

                  <tr>
                    <th>Peso al Destete (Kg)</th>
                    <td>{toros.pd}</td>
                  </tr>

                  <tr>
                    <th>Peso 12 meses (Kg)</th>
                    <td>{toros.p12}</td>
                  </tr>
                  
                  <tr>
                    <th>Peso 18 meses (Kg)</th>
                    <td>{toros.p18}</td>
                  </tr>

                  <tr>
                    <th>Circunferencia 12 Meses (Cm)</th>
                    <td>{toros.ce12}</td>
                  </tr>

                  <tr>
                    <th>Circunferencia 18 Meses (Cm)</th>
                    <td>{toros.ce18}</td>
                  </tr>

                  <tr>
                    <th>Circunferencia Escrotal (Cm)</th>
                    <td>{toros.ce}</td>
                  </tr>

                  <tr>
                    <th>Inmunizado</th>
                    <td>{toros.inmunizado}</td>
                  </tr>
                </tbody>
              </table>

             
              <div className="image-container">
                {toros.image && (
                  <img src={`http://localhost:4000/${toros.image}`} alt="Toro" className="toro-image" />
                )}
              </div>
            </div>
          </div>
          
          <div className="button-container"></div>

        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Toros</button>
      </div>
    </>
  );
}

export default Toro;



/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Toro = () => {
  
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then(response => {
      response.json().then(toros => {
        setToros(toros);

      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/toros');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">

          <div className="info-container">
            <h4>TORO DATOS</h4>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>RP</th>
                  <td>{toros.rp}</td>
                </tr>

                <tr>
                  <th>Nacimiento</th>
                  <td>{toros.nacimiento.split('T')[0]}</td>
                </tr>

                <tr>
                  <th>Padre</th>
                  <td>{toros.padre}</td>
                </tr>


                <tr>
                  <th>Peso al Nacimiento (Kg)</th>
                  <td>{toros.pn}</td>
                </tr>

                <tr>
                  <th>Peso al Destete (Kg)</th>
                  <td>{toros.pd}</td>
                </tr>

                <tr>
                  <th>Peso 12 meses (Kg)</th>
                  <td>{toros.p12}</td>
                </tr>

                
                <tr>
                  <th>Peso 18 meses (Kg)</th>
                  <td>{toros.p18}</td>
                </tr>
               
               
                <tr>
                  <th>Circunferencia 12 Meses (Cm)</th>
                  <td>{toros.ce12}</td>
                </tr>

                
                <tr>
                  <th>Circunferencia 18 Meses (Cm)</th>
                  <td>{toros.ce18}</td>
                </tr>

                
                <tr>
                  <th>Circunferencia Escrotal (Cm)</th>
                  <td>{toros.ce}</td>
                </tr>

                
                <tr>
                  <th>Inmunizado</th>
                  <td>{toros.inmunizado}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="button-container">
          </div>

        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Toros</button>
      </div>
    </>
  );
}

export default Toro;
*/
