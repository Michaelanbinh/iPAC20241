const socket = new WebSocket('ws://your-esp32-ip-address');


socket.onopen = function() {
    console.log("Connected to ESP32 WebSocket");
};


socket.onmessage = function(event) {
    const data = JSON.parse(event.data); 

    document.getElementById('ax').textContent = data.ax;
    document.getElementById('ay').textContent = data.ay;
    document.getElementById('az').textContent = data.az;

    updateSequenceDiagram(data);
    updateFFTDiagram(data);
};

// Xử lý lỗi kết nối
socket.onerror = function(error) {
    console.log("WebSocket Error: ", error);
};

// Khi kết nối WebSocket bị đóng
socket.onclose = function() {
    console.log("WebSocket connection closed");
};

// Hàm cập nhật đồ thị sequence
function updateSequenceDiagram(data) {
    const ctx = document.getElementById("sequence-canvas").getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillText(`Sequence Diagram: ax = ${data.ax}`, 50, 50);
}

// Hàm cập nhật đồ thị FFT
function updateFFTDiagram(data) {
    const ctx = document.getElementById("fft-canvas").getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
    ctx.fillText(`FFT Diagram: az = ${data.az}`, 50, 50);
}
