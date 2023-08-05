from flask import request, Response, Flask, send_from_directory, Blueprint
import requests
import waitress
import argparse


parser = argparse.ArgumentParser(description='A proxy for matemaks.pl that bypasses the client-side premium checks.',
                                 formatter_class=argparse.ArgumentDefaultsHelpFormatter
                                 )


parser.add_argument('--host', default='localhost',
                type=str, help='Set up a host')
parser.add_argument('--port', default=80,
                    type=int, help='Set up a port')
parser.add_argument('--subdomain', default='mateproxy',
                    type=str, help='Set up a subdomain')
args = vars(parser.parse_args())

host = args['host']
port = args['port']
subdomain = args['subdomain']

app = Flask(__name__,
            subdomain_matching=True
            )

app.config['SERVER_NAME'] = f'{host}:{port}'

url = (lambda subdomain, host:  f'{subdomain}.{host}' if (
    subdomain) else host)(subdomain, host)

mateproxy = Blueprint(
    'mateproxy', __name__,
    template_folder='templates',
    static_folder='static',
    subdomain=subdomain
)

@mateproxy.route('/skrypty/skrypty_c_<int:version>.js',
                 defaults={
                     'directory': 'skrypty',
                     'filename': 'skrypty.js'
                 })
@mateproxy.route('/skrypty/skrypty_login_<int:version>.js',
                 defaults={
                     'directory': 'skrypty',
                     'filename': 'skrypty_login.js'
                 })
@mateproxy.route('/skrypty/wykres_funkcji_comp.js',
                 defaults={
                     'directory': 'skrypty',
                     'filename': 'wykres_funkcji_comp.js'
                 })
@mateproxy.route('/skrypty/zaaw_kalk_comp.js',
                 defaults={
                     'directory': 'skrypty',
                     'filename': 'zaaw_kalk_comp.js'
                 })
@mateproxy.route('/mstyle_<int:version>.css',
                 defaults={
                     'directory': 'css',
                     'filename': 'style.css'
                 })
def serve_file(directory, filename, version):
    return send_from_directory(directory, filename)


@mateproxy.route('/', defaults={'text': ''})
@mateproxy.route('/<path:text>', methods=['GET'])
def serve(text):
    r = requests.get(f'https://matemaks.pl/{text}')
    c = r.content
    if text.endswith('.html') or not ('.' in text):
        c = c.decode('utf-8')\
            .replace('www.matemaks.pl', url)\
            .replace('matemaks.pl', url)\
            .replace('https', 'http')\
            .replace('www.google.com', '.')\
            .replace('cse.google.com', '.')
    return Response(c, mimetype=r.headers.get('content-type', 'text/html'))


@mateproxy.route('/<path:text>.php', methods=['POST'])
def def_post(text):
    i = request.form.to_dict()
    r = requests.post(f'https://www.matemaks.pl/{text}.php', data=i).content
    return r


app.register_blueprint(mateproxy)

def main(host, port, subdomain):
    print(f'Listening on http://{subdomain}.{host}:{port}/')
    waitress.serve(app=app,
                   host=f"{host}",
                   port=port,
                   threads=10,
                   log_socket_errors=False)


if __name__ == "__main__":
    main(host, port, subdomain)
    
