from handlers.base import BaseHandler

import logging
logger = logging.getLogger('boilerplate.' + __name__)
import json

from tornado.options import options
from os.path import realpath, join, isdir, basename
import glob
import re

import pdb
import pickle

import sys
import os
import gps_agent_pkg
sys.path.append(os.path.join(
    os.sep.join(gps_agent_pkg.__path__[0].split(os.sep)[:-7]),
    'python',
))

from gps.proto.gps_pb2 import END_EFFECTOR_POSITIONS

file_name_re = re.compile(r"(pol|traj)_sample_itr_(\d+).pkl")

class FooHandler(BaseHandler):
    def get(self):
        self.set_cookie('_xsrf', self.xsrf_token)
        self.render("base.html")

    def post(self):
        data_files_dir = realpath(join(options['exp-dir'], 'data_files',))
        if not isdir(data_files_dir):
            raise Exception('%s is not a directory'%data_files_dir)    
        

        iteration_d = {}
        for pkl in glob.glob(join(data_files_dir, '*_sample_itr_*.pkl')):
            file_name = basename(pkl)
            m = file_name_re.match(file_name)
            if not m:
                raise Exception('fail to parse sample type and iter number by the file name %s'%pkl)
            pol, iter_no = m.groups()
            iter_no = int(iter_no)
            if iter_no not in iteration_d:
                iteration_d[iter_no] = {}
            iteration_d[iter_no][pol] = {}
            sample = self._process_pkl(pkl)
            for cond in range(len(sample)):
                iteration_d[iter_no][pol][cond] = sample[cond]

        req = json.loads(self.get_argument('json_req'))
        for iter_no in req['iter_tag']: 
            print iter_no
            for cond_no in req['condition_tag']:
                print cond_no
                for sample_type in req['sample_type_tag']:
                    print sample_type

        self.write(json.dumps(iteration_d))

    def _process_pkl(self, pkl):
        with open(pkl, 'rb') as f:
            sample = pickle.load(f)

        return [[
            {
                'x':j._data[END_EFFECTOR_POSITIONS][:, 0].tolist(),
                'y':j._data[END_EFFECTOR_POSITIONS][:, 1].tolist(),
                'z':j._data[END_EFFECTOR_POSITIONS][:, 2].tolist(),
            } for j in i._samples] for i in sample]


