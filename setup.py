from setuptools import setup
setup(
    name='mateprox',
    version='0.1',
    author='norbudzinski',
    description='A proxy for matemaks.pl',
    url='https://github.com/n-budzinski',
    keywords='development, setup, setuptools',
    packages=['css','skrypty'],
    python_requires='>=3.7, <4',
    install_requires=[
        'flask',
        'requests',
        'waitress',
    ],
    package_data={
        'sample': ['sample_data.csv'],
    },
    entry_points={
        'runners': [
            'sample=sample:main',
        ]
    }
)