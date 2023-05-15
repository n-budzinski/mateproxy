from flask import request, Response, Flask, send_from_directory
import requests
import waitress

subdomain = "mateproxy"
host = 'localhost'
port = 80
app = Flask(__name__, subdomain_matching=True)
app.config['SERVER_NAME'] = f'{host}:{port}'

@app.route('/skrypty/skrypty_c_<int:version>.js', 
           defaults={
               'directory' : 'skrypty',
               'filename'  : 'skrypty.js'
               },
           subdomain=subdomain)

@app.route('/skrypty/skrypty_login_<int:version>.js', 
           defaults={
               'directory' : 'skrypty',
               'filename'  : 'skrypty_login.js'
               },
           subdomain=subdomain)

@app.route('/skrypty/wykres_funkcji_comp.js', 
           defaults={
               'directory' : 'skrypty',
               'filename'  : 'wykres_funkcji_comp.js'
               },
           subdomain=subdomain)

@app.route('/skrypty/zaaw_kalk_comp.js', 
           defaults={
               'directory' : 'skrypty',
               'filename'  : 'zaaw_kalk_comp.js'
               },
           subdomain=subdomain)

@app.route('/mstyle_<int:version>.css', 
           defaults={
               'directory' : 'css',
               'filename'  : 'style.css'
               },
           subdomain=subdomain)

def serve_file(directory, filename, version):
    print(directory + " " + filename)
    return send_from_directory(directory, filename)

@app.route('/', defaults={'text': ''}, subdomain=subdomain)
@app.route('/<path:text>', methods=['GET'], subdomain=subdomain)
def serve(text):
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

@app.route('/<path:text>.php', methods=['POST'], subdomain=subdomain)
def def_post(text):
    i = request.form.to_dict()
    r = requests.post(f'https://www.matemaks.pl/{text}.php', data=i).content
    return r

if __name__ == "__main__":
    print(f'Listening on http://{subdomain}.{host}:{port}/')
    waitress.serve(app=app,
                   host=f"{subdomain}.{host}",
                   port=port,
                   threads=10,
                   log_socket_errors=False)
