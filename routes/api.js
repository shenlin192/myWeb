/**
 * Created by shenlin on 16/11/2017.
 */
var express = require('express');
var router = express.Router();


/* For react demo */
router.get('/investisseur/investor_info/', function(req, res, next){
    res.json({
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
            {
                "id": 1189,
                "basicInfo": {
                    "city": "PARIS",
                    "description": "I love Javascript",
                    "firstName": "SHEN",
                    "profession": "Web developer",
                    "photo": "images/dashboard/avatar/avatar0.jpg",
                    "address": "Boulevard de Reuilly",
                    "userId": 1904,
                    "telephone": "+330698625433",
                    "twitterpage": "",
                    "birthday": "1993-02-23",
                    "linkedinpage": "https://www.linkedin.com/in/shenlin192/",
                    "company_name": "shenlinweb",
                    "userProfileId": 1807,
                    "lastName": "Lin",
                    "facebookpage": "",
                    "country": "FRA",
                    "email": "shenlin192@gmail.com",
                    "zip_code": "75000"
                },
                "kyc": "kyc1",
                "papier_identite_passport": "",
                "passport_valid": 0,
                "papier_identite_idCard_recto": "",
                "papier_identite_idCard_verso": "",
                "papier_identite_valid": 0,
                "papier_identite_type": "passport",
                "justificatif_domicile": "",
                "justificatif_domicile_valid": 0,
                "type_investisseur": "Particulier",
                "net_annual_income": "",
                "provenance_revenu": "",
                "patrimoine": "0,200",
                "origines_patrimoine": "",
                "isf": "non",
                "fond_invest": "oui",
                "secteurAct": "0,2",
                "motivInv": "2",
                "defiscalisation": "5",
                "montantInvCetteAnnee": "<1000",
                "expInv": "1",
                "dureeInv": "débutant",
                "montantInvFinancier": "<5000"
            }
        ]
    });
});





router.get('/investisseur/resa/', function(req, res, next){
    res.json({
        "count": 25,
        "next": "http://dev.ipoome.com/api/investisseur/resa/?page=2",
        "previous": null,
        "results": [
            {
                "id": 613,
                "amount": "1000.00",
                "date_investment": "2017-08-11T14:13:37Z",
                "project": {
                    "capital_social": 0,
                    "total_amount_requested": 50000,
                    "project_name": "Dams SocietyAad",
                    "image": "/images/dashboard/project/project4.jpg",
                    "documents": [],
                    "adresse_societe": "New York",
                    "activity_domain": "Objet connecté",
                    "project_id": 327,
                    "valorisation": 1010000000,
                    "montage": "Direct",
                    "supporter_collection": 8
                }
            },
            {
                "id": 709,
                "amount": "1200.00",
                "date_investment": "2017-08-29T15:07:17Z",
                "project": {
                    "capital_social": 0,
                    "total_amount_requested": 70000,
                    "project_name": "DELL",
                    "image": "0",
                    "documents": [],
                    "adresse_societe": "Paris",
                    "activity_domain": "Internet",
                    "project_id": 369,
                    "valorisation": 513000,
                    "montage": "Direct",
                    "supporter_collection": 0
                }
            },
            {
                "id": 762,
                "amount": "2350.00",
                "date_investment": "2017-09-18T13:02:34Z",
                "project": {
                    "capital_social": 0,
                    "total_amount_requested": 50000,
                    "project_name": "Dams SocietyAad",
                    "image": "/images/dashboard/project/project9.jpg",
                    "documents": [
                        {
                            "path": "/media/cofunding/LOI/a/a_LOI_327_762_signed.pdf",
                            "name": "a_LOI_327_762_signed.pdf"
                        }
                    ],
                    "adresse_societe": "HongKong",
                    "activity_domain": "Objet connecté",
                    "project_id": 329,
                    "valorisation": 1010000000,
                    "montage": "Direct",
                    "supporter_collection": 8
                }
            },

        ]
    })
});







router.get('/user_management/suivi_projects/', function(req, res, next){
    res.json({
        "count": 15,
        "next": "http://dev.ipoome.com/api/user_management/suivi_projects/?page=2",
        "previous": null,
        "results": [
            {
                "id": 43,
                "name": "Papoti",
                "activity": "",
                "statut": 0,
                "adresse_societe": "",
                "searchedAmount": 200000,
                "sum_reservations": 76500,
                "defisc": [],
                "contractor": {
                    "photo": "images/dashboard/avatar/avatar1.jpg",
                    "profession": null,
                    "firstName": "Audrey",
                    "lastName": "GUILLEUX"
                },
                "supporter_collection": 75,
                "documents": [],
                "imageResponsive": "images/dashboard/project/project1.jpg",
                "status": "En inscription"
            },
            {
                "id": 74,
                "name": "Hear & Know",
                "activity": "",
                "statut": 0,
                "adresse_societe": "",
                "searchedAmount": 250000,
                "sum_reservations": 43000,
                "defisc": [],
                "contractor": {
                    "photo": "images/dashboard/avatar/avatar2.jpg",
                    "profession": null,
                    "firstName": "Jean-Philippe",
                    "lastName": "Lelievre"
                },
                "supporter_collection": 110,
                "documents": [],
                "imageResponsive": "images/dashboard/project/project2.jpg",
                "status": "En inscription"
            },
            {
                "id": 44,
                "name": "ICARE Technologies",
                "activity": "",
                "statut": 0,
                "adresse_societe": "",
                "searchedAmount": 500000,
                "sum_reservations": 0,
                "defisc": [],
                "contractor": {
                    "photo": "images/dashboard/avatar/avatar6.jpg",
                    "profession": null,
                    "firstName": "Jérémy",
                    "lastName": "NEYROU"
                },
                "supporter_collection": 23,
                "documents": [],
                "imageResponsive": "images/dashboard/project/project3.jpg",
                "status": "En inscription"
            },
            {
                "id": 130,
                "name": "Prof en Poche",
                "activity": "",
                "statut": 0,
                "adresse_societe": "",
                "searchedAmount": 500000,
                "sum_reservations": 0,
                "defisc": [],
                "contractor": {
                    "photo": "images/dashboard/avatar/avatar9.jpg",
                    "profession": null,
                    "firstName": "Paul",
                    "lastName": "Escude"
                },
                "supporter_collection": 364,
                "documents": [],
                "imageResponsive": "images/dashboard/project/project4.jpg",
                "status": "En inscription"
            },
            {
                "id": 132,
                "name": "OandB",
                "activity": "",
                "statut": 0,
                "adresse_societe": "",

                "searchedAmount": 200000,
                "sum_reservations": 0,
                "defisc": [],
                "contractor": {
                    "photo": "images/dashboard/avatar/avatar3.jpg",
                    "profession": null,
                    "firstName": "Vincent",
                    "lastName": "SantaCruz"
                },
                "supporter_collection": 319,
                "documents": [],
                "imageResponsive": "images/dashboard/project/project5.jpeg",
                "status": "En inscription"
            },
            {
                "id": 133,
                "name": "Agree",
                "activity": "",
                "statut": 0,
                "adresse_societe": "",
                "searchedAmount": 300000,
                "sum_reservations": 0,
                "defisc": [],
                "contractor": {
                    "photo": "images/dashboard/avatar/avatar10.jpg",
                    "profession": null,
                    "firstName": "cedric",
                    "lastName": "feuillet"
                },
                "supporter_collection": 14,
                "documents": [],
                "imageResponsive": "images/dashboard/project/project6.gif",
                "status": "En inscription"
            },
            {
                "id": 120,
                "name": "ORLAC Solutions",
                "activity": "",
                "statut": 0,
                "adresse_societe": "",
                "searchedAmount": 200000,
                "sum_reservations": 0,
                "defisc": [],
                "contractor": {
                    "photo": "images/dashboard/avatar/avatar8.jpg",
                    "profession": null,
                    "firstName": "Pascale",
                    "lastName": "MAYCA"
                },
                "supporter_collection": 30,
                "documents": [],
                "imageResponsive": "images/dashboard/project/project7.jpg",
                "status": "En inscription"
            }
        ]
    })
});






router.get('/user_management/own_project/',function(req,res,next){
    res.json(
        {
            "count": 1,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 177,
                    "name": "This is my project",
                    "activity": "Santé",
                    "statut": 4,
                    "adresse_societe": "",
                    "invadeQuestion": "<p><br></p><p>Hello world</p><p><img style=\"width: 50%;\" src=\"da",
                    "searchedAmount": 33333,
                    "sum_reservations": 1250,
                    "defisc": [],
                    "contractor": {
                        "photo": "images/dashboard/avatar/avatar10.jpg",
                        "profession": "reaztge",
                        "firstName": "SHEN",
                        "lastName": "Lin"
                    },
                    "supporter_collection": 1,
                    "documents": [],
                    "imageResponsive": "images/dashboard/project/project0.jpeg",
                    "status": "En financement"
                }
            ]
        }
    )
});



router.get('/investisseur/investment/',function(req,res,next){
    res.json({
        "count": 5,
        "next": null,
        "previous": null,
        "results": [
            {
                "id": 710,
                "amount": "1200.00",
                "date_investment": "2017-08-29T15:09:44Z",
                "project": {
                    "capital_social": 0,
                    "total_amount_requested": 70000,
                    "project_name": "DELL",
                    "image": "/images/dashboard/project/project7.jpg",
                    "documents": [
                        {
                            "path": "/media/cofunding/BSA/a/a_BSA_369_710_signed.pdf",
                            "name": "a_BSA_369_710_signed.pdf"
                        }
                    ],
                    "adresse_societe": "London",
                    "activity_domain": "Santé",
                    "project_id": 369,
                    "valorisation": 513000,
                    "montage": "Direct",
                    "supporter_collection": 0
                }
            },
            {
                "id": 722,
                "amount": "1005.00",
                "date_investment": "2017-08-30T12:25:39Z",
                "project": {
                    "capital_social": 0,
                    "total_amount_requested": 100001,
                    "project_name": "QQ",
                    "image": "/images/dashboard/project/project6.gif",
                    "documents": [],
                    "adresse_societe": "BeiJing",
                    "activity_domain": "Big data",
                    "project_id": 384,
                    "valorisation": 0.01,
                    "montage": "Direct",
                    "supporter_collection": 26
                }
            },
            {
                "id": 778,
                "amount": "2000.00",
                "date_investment": "2017-10-03T08:46:45Z",
                "project": {
                    "capital_social": 0,
                    "total_amount_requested": 100001,
                    "project_name": "Alibaba",
                    "image": "/images/dashboard/project/project2.jpg",
                    "documents": [
                        {
                            "path": "/media/cofunding/LOI/a/a_LOI_384_778_signed.pdf",
                            "name": "a_LOI_384_778_signed.pdf"
                        }
                    ],
                    "adresse_societe": "New York",
                    "activity_domain": "Santé",
                    "project_id": 388,
                    "valorisation": 0.01,
                    "montage": "Direct",
                    "supporter_collection": 26
                }
            },
            {
                "id": 784,
                "amount": "1234.00",
                "date_investment": "2017-10-04T09:12:36Z",
                "project": {
                    "capital_social": 0,
                    "total_amount_requested": 100001,
                    "project_name": "SLX",
                    "image": "/images/dashboard/project/project8.jpeg",
                    "documents": [
                        {
                            "path": "/media/cofunding/LOI/a/a_LOI_384_784_signed.pdf",
                            "name": "a_LOI_384_784_signed.pdf"
                        }
                    ],
                    "adresse_societe": "Paris",
                    "activity_domain": "Objet connecté",
                    "project_id": 386,
                    "valorisation": 0.01,
                    "montage": "Direct",
                    "supporter_collection": 26
                }
            },
            {
                "id": 785,
                "amount": "1111.00",
                "date_investment": "2017-10-04T09:53:29Z",
                "project": {
                    "capital_social": 0,
                    "total_amount_requested": 100001,
                    "project_name": "PPX",
                    "image": "/images/dashboard/project/project1.jpg",
                    "documents": [
                        {
                            "path": "/media/cofunding/LOI/a/a_LOI_384_785_signed.pdf",
                            "name": "a_LOI_384_785_signed.pdf"
                        }
                    ],
                    "adresse_societe": "Paris",
                    "activity_domain": "Santé",
                    "project_id": 124,
                    "valorisation": 0.01,
                    "montage": "Direct",
                    "supporter_collection": 26
                }
            }
        ]
    })
});


module.exports = router;