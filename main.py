from flask import request, Response, Flask, send_from_directory
import requests
import waitress

app = Flask(__name__)

host = '192.168.1.200'
port = 80

@app.route('/skrypty/skrypty_c_<int:number>.js')
def serve_script(number):
    return send_from_directory('skrypty/', 'skrypty.js')

@app.route('/skrypty/skrypty_login_<int:number>.js')
def serve_login(number):
    return send_from_directory('skrypty/', 'skrypty_login.js')

@app.route('/skrypty/wykres_funkcji_comp.js')
def wykres_funkcji_comp():
    return send_from_directory('skrypty/', 'wykres_funkcji_comp.js')

@app.route('/skrypty/zaaw_kalk_comp.js')
def zaaw_kalk_comp():
    return send_from_directory('skrypty/', 'zaaw_kalk_comp.js')

@app.route('/<filename>.css')
def serve_css(filename):
    return send_from_directory('css/', 'style.css') 

@app.route('/', defaults={'text':''})
@app.route('/<path:text>', methods=['GET'])
def def_get(text:str):
    r = requests.get(f'https://matemaks.pl/{text}')
    c = r.content
    if text.endswith('.html') or not ('.' in text):
        c = c.decode('utf-8')\
        .replace('www.matemaks.pl', host)\
        .replace('matemaks.pl', host)\
        .replace('https', 'http')\
        .replace('www.google.com', '.')\
        .replace('cse.google.com', '.')
    return Response(c, mimetype=r.headers.get('content-type', 'text/html'))  
    
@app.route('/<path:text>.php', methods=['POST'])
def def_post(text):
    i = request.form.to_dict()
    r = requests.post(f'https://www.matemaks.pl/{text}.php', data=i).content
    return r

if __name__ == "__main__":
    print(f'Listening on http://{host}:{port}/')
    waitress.serve(app=app, 
                   host=host, 
                   port=port, 
                   threads=10, 
                   log_socket_errors=False)