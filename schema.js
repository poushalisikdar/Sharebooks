const Joi = require('joi');

module.exports.BookSchema = Joi.object({
   book:Joi.object({
title:Joi.string().required(),
authorname:Joi.string().required(),
edition:Joi.number().required(),
price:Joi.number().required().min(0),
city:Joi.string().required(),
location:Joi.string().required(),
emailid:Joi.string().required(),
whatsappno:Joi.number().allow("",null),
stream:Joi.string().required(),
condition:Joi.string().required(),
image:Joi.string().allow("",null),





description:Joi.string().required(),

}).required(),

});