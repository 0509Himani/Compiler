
    function compileCode() {
      const code = document.getElementById("code").value;
      const langId = document.getElementById("language").value;
      const outputDiv = document.getElementById("output");

      outputDiv.textContent = "Compiling...";

      fetch("https://course.codequotient.com/api/executeCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, langId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          outputDiv.textContent = "Error: " + data.error;
        } else {
          const codeId = data.codeId;
          let interval = setInterval(() => {
            fetch(`https://course.codequotient.com/api/codeResult/${codeId}`)
              .then(res => res.json())
              .then(result => {
                result = JSON.parse(result.data);
                console.log(result);
                if (result && Object.keys(result).length > 0) {
                  clearInterval(interval);
                  if (result.errors) {
                    outputDiv.textContent = "Error:\n" + result.errors;
                  } else {
                    outputDiv.textContent = result.output;
                  }
                }
              });
          }, 2000);
        }
      })
      .catch(err => {
        outputDiv.textContent = "Failed to compile: " + err;
      });
    }
 