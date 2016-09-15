window.URL = window.URL || window.webkitURL;

    window.onload = function() {
    function getImage() {
            
            return new Promise(function(resolve, reject) {
                    
                var xhr = new XMLHttpRequest(); 
                
                xhr.open('GET','image.jpg', true);
                xhr.responseType = 'blob';

                setTimeout(function() {
                    xhr.send(); 
                }, 2000); 
                        
                    
                xhr.onload = function() {
                    if (this.status == 200) {
                        console.log('image loaded'); 
                        //resolve(this.response); 

                        var blob = this.response;

                        var img = document.createElement('img');
                        img.onload = function(e) {
                          window.URL.revokeObjectURL(img.src); // Clean up after yourself.
                        };
                        img.src = window.URL.createObjectURL(blob);
                        document.body.appendChild(img);
                    } 
                    else {
                        reject(new Error("Network Error"));
                    }
                } 

                xhr.onerror = function() {
                    reject(new Error("Network Error"));
                };
            }); 
    }
 
    async function main() {
        await getImage();
    }
 
    main();

    } 