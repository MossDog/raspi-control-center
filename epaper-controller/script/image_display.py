#!/usr/bin/python
# -*- coding:utf-8 -*-
import sys
import os
picdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'pic')
libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

import logging
from waveshare_epd import epd4in26
import time
from PIL import Image,ImageDraw,ImageFont
import traceback

logging.basicConfig(level=logging.DEBUG)

try:
    logging.info("epd4in26 Demo")
    epd = epd4in26.EPD()
    
    logging.info("init and Clear")
    epd.init()
    epd.Clear()

    font24 = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 24)
    font18 = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 18)
    font35 = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 35)

    logging.info("convert bitflip.png to greyscale BMP and display")
    epd.init_Fast()
    png_path = os.path.join(picdir, 'bitflip.png')
    bmp_path = os.path.join(picdir, 'bitflip.bmp')
    # Load PNG, convert to greyscale, resize, save as BMP
    Himage = Image.open(png_path).convert('L')
    Himage = Himage.resize((epd.width, epd.height))
    Himage.save(bmp_path, format='BMP')
    # Load the BMP and display
    Himage_bmp = Image.open(bmp_path)
    epd.display_Fast(epd.getbuffer(Himage_bmp))
    time.sleep(2)
    """     
        logging.info("Clear...")
        epd.init()
        epd.Clear()
    """
    logging.info("Goto Sleep...")
    epd.sleep()
    

    
except IOError as e:
    logging.info(e)
    
except KeyboardInterrupt:
    pass
"""     logging.info("ctrl + c:")
    epd4in26.epdconfig.module_exit(cleanup=True)
    exit() """
