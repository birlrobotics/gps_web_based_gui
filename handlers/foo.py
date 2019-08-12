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
number_re = re.compile(r"(all|\d+)")

class FooHandler(BaseHandler):
    def get(self):
        self.set_cookie('_xsrf', self.xsrf_token)
        self.render("base.html")

    def post(self):
        data_files_dir = realpath(join(options['exp-dir'], 'data_files',))
        if not isdir(data_files_dir):
            raise Exception('%s is not a directory'%data_files_dir)    
        

        req = json.loads(self.get_argument('json_req'))
        iter_filter = []
        for iter_no in req['iter_tag']: 
            m = number_re.search(iter_no)
            if not m:
                raise Exception('fail to parse iter number in %s'%iter_no)

            if m.group(0) == 'all':
                iter_filter = None
                break
            else:
                iter_filter.append(int(m.group(0)))

        condition_filter = []
        for cond_no in req['condition_tag']:
            m = number_re.search(cond_no)
            if not m:
                raise Exception('fail to parse cond number in %s'%cond_no)

            if m.group(0) == 'all':
                condition_filter = None
                break
            else:
                condition_filter.append(int(m.group(0)))

        sample_type_filter = []
        for sample_type in req['sample_type_tag']:
            if sample_type == 'lingausscontroller':
                sample_type_filter.append('traj')
            elif sample_type == 'dnncontroller':
                sample_type_filter.append('pol')

        iteration_d = {}
        for pkl in glob.glob(join(data_files_dir, '*_sample_itr_*.pkl')):
            file_name = basename(pkl)
            m = file_name_re.match(file_name)
            if not m:
                raise Exception('fail to parse sample type and iter number by the file name %s'%pkl)
            pol, iter_no = m.groups()

            if pol not in sample_type_filter or iter_filter is not None and iter_no not in iter_filter:
                continue

            iter_no = int(iter_no)
            if iter_no not in iteration_d:
                iteration_d[iter_no] = {}
            iteration_d[iter_no][pol] = {}
            sample = self._process_pkl(pkl)
            for cond in range(len(sample)):
                if condition_filter is not None and cond not in condition_filter:
                    continue
                iteration_d[iter_no][pol][cond] = sample[cond]

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


