from handlers.foo import FooHandler

url_patterns = [
    (r"/", FooHandler),
    (r"/get_plotting_data_in_json", FooHandler),
]
