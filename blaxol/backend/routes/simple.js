const express = require('express');
const router = express.Router();
const RFP = require('../models/RFP')
const fs = require('fs');
const path = require('path');
const { saveAs } = require("file-saver");
// const { Packer } = require('docx');

const { AlignmentType, Document, Packer, Paragraph, TextRun, Header, 
    Table, PageBreak, TableCell, TableRow, WidthType,ImageRun ,convertInchesToTwip,LevelFormat } = require("docx");


// const saveAs = require('file-saver');
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
const formatDate = (dateString) => {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = parseInt(dateParts[1]) - 1; // Adjust month to zero-based index
    const day = dateParts[2];

    const formattedDate = `${months[month]} ${day}, ${year}`;
    return formattedDate;
}




router.post('/invoice1', async (req, res) => {
    console.log(req.body);
    console.log(req.body.info.project_name)
    console.log(req.body.agenda)
    const tablearray = req.body.tables
    const ex_tables = req.body.tablecontent

    try {
        const letter_text = `This proposal and contract are the property of Blaxol Risensi LLP (“Blaxol”) and must not be disclosed outside the family of ${req.body.info.client_name} or be duplicated, used, or disclosed—in whole or in part—for any purpose other than to evaluate this proposal. If a contract is awarded to Blaxol as a result of, or in connection with, this proposal, the Promoters shall have the right to duplicate, use, or disclose the data to the extent provided in the resulting contract and subject to the limitations of the Privacy Policy and other applicable bylaws. This proposal contains trade secrets and proprietary commercial or financial information, and information of a personal nature that is exempt from disclosure under OPRAA and other applicable laws.Accordingly, no portion of this document should be released without consulting BLAXOL. This information is contingent on the Parties reaching mutually agreeable terms and conditions and upon acceptance of any limitations described herein`

        const font_general = 'IBM Plex Sans'
        const font_letter = 'Calibri (Body)'
        const columnHeadings2 = ["Name", "Designation", "Organisation", "Email", "Mobile"];
        const columnHeadings1 = ["Activity", "Timeline", "Professional Fees", "Reimbursement", "Government Fees"];
        const result = req.body.agenda.map(item => {
            const children = []

            if (item.heading) {
                children.push(new Paragraph({


                    text: item.heading,
                    text: item.heading,
                    size: 32,
                    font: font_general,

                    numbering: {
                        level: 0,
                        reference: "my-crazy-numbering",
                    },
                    style: "aside"
                }));
            }

            if (item.para) {
                children.push(...item.para.split('\n').map(line => new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    style: "wellSpaced",
                    children: [
                        new TextRun({
                            text: line,
                            size: 28,
                            font: font_general,
                            color: '#03396c',
                        }),
                    ],
                })));
            }
            new Paragraph("\n")
            if (item.sub) {
                item.sub.map(subItem => {
                    if (subItem.heading && subItem.para) {
                        children.push(new Paragraph({
                            alignment: AlignmentType.JUSTIFIED,
                            numbering: {
                                level: 2,
                                reference: "my-crazy-numbering",
                            },
                            style: "wellSpaced",
                            children: [
                                new TextRun({

                                    text: subItem.heading + ": ",
                                    size: 28,
                                    font: font_general,
                                    bold: true,
                                    color: '#03396c',

                                }),
                                new TextRun({

                                    text: subItem.para, // Combine heading and para with " : "
                                    size: 28,
                                    font: font_general,
                                    color: '#03396c',


                                }),

                            ],
                        }));
                    }
                });
            }
            if (item.para1) {
                children.push(...item.para1.split('\n').map(line => new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360
                    },
                    // style : "wellSpaced",
                    children: [
                        new TextRun({
                            text: line,
                            size: 28,
                            font: font_general,
                            spacing: {
                                line: 360
                            }
                        }),
                    ],
                })));
            }

            children.push(new Paragraph("\n"))

            return children;
        })


        const result1 = req.body.agenda1.map(item => {
            const children1 = []
            if (item.para) {
                children1.push(...item.para.split('\n').map(line => new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360
                    },

                    children: [
                        new TextRun({
                            text: line,
                            size: 24,
                            font: font_general,
                            color: '#03396c',
                            spacing: {
                                line: 360
                            }
                        }),
                    ],
                })));


            }

            if (item.sub) {
                item.sub.map(subItem => {
                    if (subItem.heading && subItem.para) {
                        children1.push(new Paragraph({
                            style: "wellSpaced",
                            alignment: AlignmentType.JUSTIFIED,
                            numbering: {
                                level: 2,
                                reference: "my-crazy-numbering1",
                            },
                            children: [
                                new TextRun({

                                    text: subItem.heading + ": ",
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    bold: true

                                }),
                                new TextRun({

                                    text: subItem.para, // Combine heading and para with " : "
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',


                                }),

                            ],
                        }));
                    }
                });
            }

            if (item.para1) {
                children1.push(...item.para1.split('\n').map(line => new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        line: 360
                    },
                    // style : "wellSpaced",
                    children: [
                        new TextRun({
                            text: line,
                            size: 24,
                            font: font_general,
                            color: '#03396c',
                            spacing: {
                                line: 360
                            }
                        }),
                    ],
                })));
            }
            return children1;
        })



        let table1;
        if (req.body.tables.length > 0) {
            table1 = new Table({
                style: "mystyling1",
                alignment: AlignmentType.CENTER,
                width: {
                    size: 10070,
                    type: WidthType.DXA,
                },
                rows: [
                    new TableRow({
                        children: Object.keys(req.body.tables[0]).map((heading) =>
                            new TableCell({
                                width: {
                                    size: 10070,
                                    type: WidthType.DXA,
                                },
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: heading,
                                                size: 24,
                                                font: font_letter,
                                                bold: true,
                                                color: '#03396c',

                                            }),
                                        ],
                                    }),
                                ],
                            })
                        ),
                    }),
                    ...req.body.tables.map((content) =>
                        new TableRow({
                            children: Object.values(content).map((text) =>
                                new TableCell({
                                    width: {
                                        size: 10070,
                                        type: WidthType.DXA,
                                    },
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: text,
                                                    size: 24,
                                                    font: font_letter,
                                                    color: '#03396c',
                                                }),
                                            ],
                                        }),
                                    ],
                                })
                            ),
                        })
                    ),
                ],
            });
        }


        let table2
            table2 = new Table({
                style: "mystyling1",
                alignment: AlignmentType.CENTER,
                width: {
                    size: 10070,
                    type: WidthType.DXA,
                },
                rows: [
                    new TableRow({
                        children: columnHeadings2.map((heading) =>
                            new TableCell({
                                width: {
                                    size: 10070,
                                    type: WidthType.DXA,
                                },
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: heading,
                                                size: 24,
                                                font: font_letter,
                                                bold: true,
                                                color: '#03396c',

                                            }),
                                        ],
                                    }),
                                ],
                            })
                        ),
                    }),
                    ...req.body.tablecontent.map((content) =>
                    new TableRow({
                        children: Object.values(content).map((text,index) => (
                            // console.log(index),
                            new TableCell({
                                width: {
                                    size: 11070,
                                    type: WidthType.DXA,
                                },
                                children: [
        
                                    index === 3 ? new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: text,
                                                size: 24,
                                                font: font_general,
                                                color: '#03396c',
                                                underline: true
                                            }),
                                        ],
                                    }) : new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: text,
                                                size: 24,
                                                font: font_general,
                                                color: '#03396c',
        
                                            }),
                                        ],
                                    })],
                            })
                        )),
                    })
                    ),
                ],
            });
        


        // console.log(table1);
        // let tableRowArray
        // tableRowArray = req.body.tablecontent.map(content => (
        //     new TableRow({
        //         children: Object.values(content).map((index, text) => (
        //             // console.log(index),
        //             new TableCell({
        //                 width: {
        //                     size: 11070,
        //                     type: WidthType.DXA,
        //                 },
        //                 children: [

        //                     index === 3 ? new Paragraph({
        //                         alignment: AlignmentType.CENTER,
        //                         children: [
        //                             new TextRun({
        //                                 text: text,
        //                                 size: 24,
        //                                 font: font_general,
        //                                 color: '#03396c',
        //                                 underline: true
        //                             }),
        //                         ],
        //                     }) : new Paragraph({
        //                         alignment: AlignmentType.CENTER,
        //                         children: [
        //                             new TextRun({
        //                                 text: text,
        //                                 size: 24,
        //                                 font: font_general,
        //                                 color: '#03396c',

        //                             }),
        //                         ],
        //                     })],
        //             })
        //         )),
        //     })
        // ));




        const doc = new Document({
            styles: {
                default: {},
                paragraphStyles: [
                    {
                        id: "aside",
                        name: "Aside",
                        basedOn: "Normal",
                        next: "Normal",
                        run: {
                            // color: "999999",
                            // italics: true,
                            size: 32,
                            font: font_general,
                            bold: true,
                            color: '#03396c',
                            spacing: {
                                after: 400,
                            },

                        },
                        paragraph: {
                            size: 32,
                            font: font_general,
                            color: '#03396c',
                            spacing: {
                                after: 400,
                            },
                        },
                    },
                    {
                        id: "wellSpaced",
                        name: "Well Spaced",
                        basedOn: "Normal",
                        quickFormat: true,
                        run: {
                            // color: "999999",
                            // italics: true,
                            size: 24,
                            font: font_general,
                            spacing: {
                                after: 400,
                            },



                        },
                        paragraph: {
                            spacing: {
                                line: 360,
                                // after : 400
                            },
                            indent: {
                                left: 700
                            }
                        },
                    },

                    {
                        id: "customStyle",
                        name: "Custom Style",
                        basedOn: "Normal",
                        next: "Normal",
                        paragraph: {
                            size: 24,

                            font: font_general,
                            color: '#000080',
                            spacing: {
                                line: 250
                            }, // You can add alignment here if needed
                        },
                    },
                    {
                        id: "mystyling1",
                        name: "Strike Underline",
                        basedOn: "Normal",
                        quickFormat: true,
                        run: {
                            spacing: {
                                before: 400
                            }

                        },
                    },
                ],

                characterStyles: [
                    {
                        id: "strikeUnderlineCharacter",
                        name: "Strike Underline",
                        basedOn: "Normal",
                        quickFormat: true,
                        run: {
                            strike: true,
                            // underline: {
                            //     type: UnderlineType.SINGLE,
                            // },
                        },
                    },
                ],
            },
            numbering: {

                config: [
                    {
                        reference: "my-crazy-numbering",
                        levels: [
                            {
                                level: 0,
                                format: LevelFormat.DECIMAL,
                                text: "%1.0",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.5) },
                                    },
                                    run: {
                                        bold: true,
                                        size: 32,
                                        font: {
                                            name: font_letter
                                        },
                                    },
                                },
                            },
                            {
                                level: 1,
                                format: "decimal",
                                text: "%1.",
                                alignment: AlignmentType.START,
                                style: {

                                },
                            },
                            {
                                level: 2,
                                format: "decimal",
                                text: "%3)",
                                alignment: AlignmentType.START,
                                bold: true,
                                style: {
                                    paragraph: {
                                        indent: { left: convertInchesToTwip(0.50 + 0.32), hanging: convertInchesToTwip(0.32) },
                                    },
                                    run: {
                                        bold: true,
                                        color: '#03396c',
                                    }

                                },
                            },
                            {
                                level: 3,
                                format: "upperLetter",
                                text: "%4)",
                                alignment: AlignmentType.START,
                                style: {

                                },
                            },
                        ],
                    },
                    {
                        reference: "my-crazy-numbering1",
                        size: 64,
                        font: font_general,
                        levels: [
                            {
                                level: 0,
                                format: "decimal",
                                text: "%1.0",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.5) },
                                    },
                                    run: {
                                        bold: true,
                                        size: 32,
                                        font: {
                                            name: font_letter
                                        },


                                    },
                                },
                            },
                            {
                                level: 1,
                                format: "decimal",
                                text: "%).",
                                alignment: AlignmentType.START,

                                style: {
                                    paragraph: {
                                        indent: { left: convertInchesToTwip(0.48), hanging: convertInchesToTwip(0.48) },
                                    },
                                    run: {
                                        bold: true,
                                        color: '#03396c',
                                    }

                                },
                            },

                            {
                                level: 2,
                                format: "decimal",
                                text: "%3.",
                                alignment: AlignmentType.START,
                                bold: true,
                                style: {
                                    paragraph: {
                                        size: 24
                                    },
                                    run: {
                                        bold: true,
                                        color: '#03396c',
                                    }

                                },
                            },
                            {
                                level: 3,
                                format: "upperLetter",
                                text: "%4)",
                                alignment: AlignmentType.START,
                                style: {

                                },
                            },
                        ],
                    }
                ],
            },

            sections: [
                {
                    headers: {
                        default: new Header({
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [
                                        new TextRun({
                                            text: "STRICTLY CONFIDENTIAL",
                                            size: 20,
                                            font: font_general,
                                            color: '#FF0000'
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [
                                        new TextRun({
                                            text: "PRELIMINARY DRAFT SUBJECT TO REVISION",
                                            size: 20,
                                            font: font_general,
                                            color: '#FF0000'
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [
                                        new TextRun({
                                            text: "SUBJECT TO FRE 408 AND CONFIDENTIALITY",
                                            size: 20,
                                            font: font_general,
                                            color: '#FF0000'
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    },
                    children: [
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: 'Blaxol Risensi LLP',
                                    size: 32,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: req.body.info.project_name,
                                    size: 48,
                                    font: font_general,
                                    color: '#000080',
                                    bold: true,
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: 'Consulting Services Engagement Letter,',
                                    size: 24,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: 'Rules for Engagement',
                                    size: 24,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: `Proposal for: ${req.body.info.spoc}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: req.body.info.rfp,
                                    size: 24,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: '® Blaxol Risensi LLP (A Member of Blaxol LLC)',
                                    size: 32,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: formatDate(req.body.info.date),
                                    size: 32,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: 'ENG - BLR',
                                    size: 32,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,

                            children: [
                                new ImageRun({
                                    data: fs.readFileSync(path.resolve('backend/docfiles', 'Picture1.png')),
                                    transformation: {
                                        width: 184,
                                        height: 184,
                                    },
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.JUSTIFIED,

                            children: [
                                new TextRun({
                                    text: letter_text,
                                    size: 19,
                                    font: font_letter,
                                    color: '#03396c',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph("\n"),
                        new Paragraph({ children: [new PageBreak()] }),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            style: 'customStyle',
                            children: [
                                new TextRun({
                                    text: '#30, 2 nd Floor, 4 th Main Road,',
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    break: 1,
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            style: 'customStyle',
                            children: [
                                new TextRun({
                                    text: 'Jayanagar 7 th Block, Bengaluru,',
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: 'Karnataka, India 560070',
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,

                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: formatDate(req.body.info.date),
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    break: 1,
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 1400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: `Attn: ${req.body.info.spoc}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    break: 1,
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: `${req.body.info.client_name}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    break: 1,
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: `${req.body.info.district}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: `${req.body.info.city}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: 'India 110070 ',
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: req.body.info.project_subject,
                                    size: 24,
                                    font: font_general,

                                    color: '#03396c',

                                    underline: true,
                                    // color : '#000080',
                                    break: 1,
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph("\n"),
                        ...req.body.info.letter_half1.split('\n').map((line) => new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.JUSTIFIED,
                            children: [
                                new TextRun({
                                    text: line,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',

                                }),

                            ],

                        })),
                        new Paragraph('\n'),
                        table1,
                        new Paragraph('\n'),
                        ...req.body.info.letter_half2.split('\n').map((line) => new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.JUSTIFIED,
                            children: [
                                new TextRun({
                                    text: line,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',

                                }),

                            ],

                        })),
                        new Paragraph({ children: [new PageBreak()] }),
                        ...result.flat(),
                        new Paragraph({ children: [new PageBreak()] }),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph({
                            style: "mystyling1",
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Exhibit A',
                                    size: 32,
                                    font: font_general,
                                    bold: true,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph({
                            style: "mystyling1",
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Key Personnel Information',
                                    size: 32,
                                    font: font_general,
                                    bold: true,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        // new Table({
                        //     style: "mystyling1",
                        //     alignment: AlignmentType.CENTER,
                        //     width: {
                        //         size: 11070,
                        //         type: WidthType.DXA,
                        //     },
                        //     rows: [
                        //         new TableRow({
                        //             children: columnHeadings.map(heading => (
                        //                 new TableCell({
                        //                     width: {
                        //                         size: 11070,
                        //                         type: WidthType.DXA,
                        //                     },
                        //                     children: [new Paragraph({
                        //                         alignment: AlignmentType.CENTER,
                        //                         children: [
                        //                             new TextRun({
                        //                                 text: heading,
                        //                                 size: 28,
                        //                                 font: font_general,
                        //                                 bold: true,
                        //                                 color: '#03396c'
                        //                             }),
                        //                         ],
                        //                     })],
                        //                 })
                        //             )),
                        //         }),

                        //         ...tableRowArray.flat()
                        //     ],
                        // }),
                        table2,
                        new Paragraph({ children: [new PageBreak()] }),
                        new Paragraph('\n'),

                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    style: "mystyling1",
                                    text: 'Fund Manager Declaration',
                                    size: 32,
                                    font: font_general,
                                    bold: true,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph('\n'),

                        ...result1.flat(),
                        new Paragraph('\n'),
                        new Paragraph({
                            style: "mystyling1",
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: 'FOR BLAXOL RISENSI LLP',
                                    size: 24,
                                    font: font_general,
                                    // bold : true,
                                    color: '#03396c',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph({
                            style: "mystyling1",
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: 'Managing Partner',
                                    size: 24,
                                    font: font_general,
                                    // bold : true,
                                    color: '#03396c',
                                    spacing: {

                                        after: 400
                                    }
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });
        const mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const fileName = "GeneratedDocument.docx";  // Define the desired filename


        Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync("Output.docx", buffer);
            const filePath = path.resolve('Output.docx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename=Output.docx');
            // Send the buffer as the response
            res.send(buffer);
            // res.send(200)

        });

        console.log(path.join(__dirname, 'backend', 'routes', 'Picture1.png'))
        // Packer.toBuffer(doc).then((buffer) => {
        //     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        //     const blobUrl = URL.createObjectURL(blob);
        
        //     // Return the Blob URL
        //     res.send(blobUrl);
        // });
        // Packer.toBlob(doc).then(blob => {
        //     // Use FileSaver.js to trigger the download
        //     saveAs(blob, "sample.docx");

        //         Packer.toBlob(doc).then(blob => {
        //             const docblob = blob.slice(0, blob.size, mimeType);
        // // Save the file using saveAs from the file-saver package
        //             saveAs(docblob, fileName);
        // });

        // });

        // Create a Blob containing the Document instance and the mimeType



    } catch (error) {
        console.log('Error generating document:', error);
        console.log("doc", error)
        res.sendStatus(500);
    }
});

// To generate 

router.post('/invoice2', async (req, res) => {
    try {
        const letter_text = `This proposal and contract are the property of Blaxol Risensi LLP (“Blaxol”) and must not be disclosed outside the family of ${req.body.info.client_name} or be duplicated, used, or disclosed—in whole or in part—for any purpose other than to evaluate this proposal. If a contract is awarded to Blaxol as a result of, or in connection with, this proposal, the Promoters shall have the right to duplicate, use, or disclose the data to the extent provided in the resulting contract and subject to the limitations of the Privacy Policy and other applicable bylaws. This proposal contains trade secrets and proprietary commercial or financial information, and information of a personal nature that is exempt from disclosure under OPRAA and other applicable laws.Accordingly, no portion of this document should be released without consulting BLAXOL. This information is contingent on the Parties reaching mutually agreeable terms and conditions and upon acceptance of any limitations described herein`

        const font_general = 'IBM Plex Sans'
        const font_letter = 'Calibri (Body)'
        const columnHeadings = ["Name", "Designation", "Organisation", "Email", "Mobile"];
        const columnHeadings1 = ["Activity", "Timeline", "Professional Fees", "Reimbursement", "Government Fees"];




        let table1;
        if (req.body.tables1.length > 0) {
            table1 = new Table({
                style: "mystyling1",
                alignment: AlignmentType.CENTER,
                width: {
                    size: 10070,
                    type: WidthType.DXA,
                },
                rows: [
                    new TableRow({
                        children: columnHeadings1.map((heading) =>
                            new TableCell({
                                width: {
                                    size: 10070,
                                    type: WidthType.DXA,
                                },
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: heading,
                                                size: 24,
                                                font: font_letter,
                                                bold: true,
                                                color: '#03396c',

                                            }),
                                        ],
                                    }),
                                ],
                            })
                        ),
                    }),
                    ...req.body.tables1.map((content) =>
                        new TableRow({
                            children: Object.values(content).map((text) =>
                                new TableCell({
                                    width: {
                                        size: 10070,
                                        type: WidthType.DXA,
                                    },
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: text,
                                                    size: 24,
                                                    font: font_letter,
                                                    color: '#03396c',
                                                }),
                                            ],
                                        }),
                                    ],
                                })
                            ),
                        })
                    ),
                ],
            });
        }


        // console.log(table1);
        console.log(req.body.tablecontent1)
        const tableRowArray = req.body.tablecontent1.map(content => (
            new TableRow({
                children: Object.values(content).map((text,index) => (
                    // console.log(index),
                    new TableCell({
                        width: {
                            size: 11070,
                            type: WidthType.DXA,
                        },
                        children: [

                            index === 3 ? new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: text,
                                        size: 24,
                                        font: font_general,
                                        color: '#03396c',
                                        underline: true
                                    }),
                                ],
                            }) : new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: text,
                                        size: 24,
                                        font: font_general,
                                        // color: '#03396c',

                                    }),
                                ],
                            })],
                    })
                )),
            })
        ));




        const doc = new Document({
            styles: {
                default: {},
                paragraphStyles: [
                    {
                        id: "aside",
                        name: "Aside",
                        basedOn: "Normal",
                        next: "Normal",
                        run: {
                            // color: "999999",
                            // italics: true,
                            size: 32,
                            font: font_general,
                            bold: true,
                            color: '#03396c',
                            spacing: {
                                after: 400,
                            },

                        },
                        paragraph: {
                            size: 32,
                            font: font_general,
                            color: '#03396c',
                            spacing: {
                                after: 400,
                            },
                        },
                    },
                    {
                        id: "wellSpaced",
                        name: "Well Spaced",
                        basedOn: "Normal",
                        quickFormat: true,
                        run: {
                            // color: "999999",
                            // italics: true,
                            size: 24,
                            font: font_general,
                            spacing: {
                                after: 400,
                            },



                        },
                        paragraph: {
                            spacing: {
                                line: 360,
                                // after : 400
                            },
                            indent: {
                                left: 700
                            }
                        },
                    },

                    {
                        id: "customStyle",
                        name: "Custom Style",
                        basedOn: "Normal",
                        next: "Normal",
                        paragraph: {
                            size: 24,

                            font: font_general,
                            color: '#000080',
                            spacing: {
                                line: 250
                            }, // You can add alignment here if needed
                        },
                    },
                    {
                        id: "mystyling1",
                        name: "Strike Underline",
                        basedOn: "Normal",
                        quickFormat: true,
                        run: {
                            spacing: {
                                before: 400
                            }

                        },
                    },
                ],

                characterStyles: [
                    {
                        id: "strikeUnderlineCharacter",
                        name: "Strike Underline",
                        basedOn: "Normal",
                        quickFormat: true,
                        run: {
                            strike: true,
                            // underline: {
                            //     type: UnderlineType.SINGLE,
                            // },
                        },
                    },
                ],
            },
            numbering: {

                config: [
                    {
                        reference: "my-crazy-numbering",
                        levels: [
                            {
                                level: 0,
                                format: LevelFormat.DECIMAL,
                                text: "%1.0",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.5) },
                                    },
                                    run: {
                                        bold: true,
                                        size: 32,
                                        font: {
                                            name: font_letter
                                        },
                                    },
                                },
                            },
                            {
                                level: 1,
                                format: "decimal",
                                text: "%1.",
                                alignment: AlignmentType.START,
                                style: {

                                },
                            },
                            {
                                level: 2,
                                format: "decimal",
                                text: "%3)",
                                alignment: AlignmentType.START,
                                bold: true,
                                style: {
                                    paragraph: {
                                        indent: { left: convertInchesToTwip(0.48), hanging: convertInchesToTwip(0.48) },
                                    },
                                    run: {
                                        bold: true,
                                        color: '#03396c',
                                    }

                                },
                            },
                            {
                                level: 3,
                                format: "upperLetter",
                                text: "%4)",
                                alignment: AlignmentType.START,
                                style: {

                                },
                            },
                        ],
                    },
                    {
                        reference: "my-crazy-numbering1",
                        size: 64,
                        font: font_general,
                        levels: [
                            {
                                level: 0,
                                format: "decimal",
                                text: "%1.0",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.5) },
                                    },
                                    run: {
                                        bold: true,
                                        size: 32,
                                        font: {
                                            name: font_letter
                                        },


                                    },
                                },
                            },
                            {
                                level: 1,
                                format: "decimal",
                                text: "%).",
                                alignment: AlignmentType.START,

                                style: {
                                    paragraph: {
                                        indent: { left: convertInchesToTwip(0.48), hanging: convertInchesToTwip(0.48) },
                                    },
                                    run: {
                                        bold: true,
                                        color: '#03396c',
                                    }

                                },
                            },

                            {
                                level: 2,
                                format: "decimal",
                                text: "%3.",
                                alignment: AlignmentType.START,
                                bold: true,
                                style: {
                                    paragraph: {
                                        size: 24
                                    },
                                    run: {
                                        bold: true,
                                        color: '#03396c',
                                    }

                                },
                            },
                            {
                                level: 3,
                                format: "upperLetter",
                                text: "%4)",
                                alignment: AlignmentType.START,
                                style: {

                                },
                            },
                        ],
                    }
                ],
            },

            sections: [
                {
                    headers: {
                        default: new Header({
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [
                                        new TextRun({
                                            text: "STRICTLY CONFIDENTIAL",
                                            size: 20,
                                            font: font_general,
                                            color: '#FF0000'
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [
                                        new TextRun({
                                            text: "PRELIMINARY DRAFT SUBJECT TO REVISION",
                                            size: 20,
                                            font: font_general,
                                            color: '#FF0000'
                                        }),
                                    ],
                                }),
                                new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [
                                        new TextRun({
                                            text: "SUBJECT TO FRE 408 AND CONFIDENTIALITY",
                                            size: 20,
                                            font: font_general,
                                            color: '#FF0000'
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    },
                    children: [
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph("\n"),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: 'Blaxol Risensi LLP',
                                    size: 32,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: req.body.info.project_name,
                                    size: 48,
                                    font: font_general,
                                    color: '#000080',
                                    bold: true,
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: 'Consulting Services Engagement Letter,',
                                    size: 24,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: 'Rules for Engagement',
                                    size: 24,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: `Proposal for: ${req.body.info.spoc}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: req.body.info.rfp,
                                    size: 24,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: '® Blaxol Risensi LLP (A Member of Blaxol LLC)',
                                    size: 32,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: formatDate(req.body.info.date),
                                    size: 32,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.LEFT,
                            style: 'mystyling1',
                            children: [
                                new TextRun({
                                    text: 'ENG - BLR',
                                    size: 32,
                                    font: font_general,
                                    color: '#000080',
                                    spacing: {
                                        line: 360
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,

                            children: [
                                new ImageRun({
                                    data: fs.readFileSync(path.resolve('backend/docfiles', 'Picture1.png')),
                                    transformation: {
                                        width: 184,
                                        height: 184,
                                    },
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.JUSTIFIED,

                            children: [
                                new TextRun({
                                    text: letter_text,
                                    size: 19,
                                    font: font_letter,
                                    color: '#03396c',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph("\n"),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            style: 'customStyle',
                            children: [
                                new TextRun({
                                    text: '#30, 2 nd Floor, 4 th Main Road,',
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    break: 1,
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            style: 'customStyle',
                            children: [
                                new TextRun({
                                    text: 'Jayanagar 7 th Block, Bengaluru,',
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: 'Karnataka, India 560070',
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,

                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: formatDate(req.body.info.date),
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    break: 1,
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 1400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: `Attn: ${req.body.info.spoc}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    break: 1,
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: `${req.body.info.client_name}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    break: 1,
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: `${req.body.info.district}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: `${req.body.info.city}`,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        // after : 200
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: 'India 110070 ',
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.LEFT,
                            children: [
                                new TextRun({
                                    text: 'Subject: Letter of Intent / Declaration and Explanation',
                                    size: 24,
                                    font: font_general,

                                    color: '#03396c',

                                    underline: true,
                                    // color : '#000080',
                                    break: 1,
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph("\n"),
                        ...req.body.info.letter_half1.split('\n').map((line) => new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.JUSTIFIED,
                            children: [
                                new TextRun({
                                    text: line,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',

                                }),

                            ],

                        })),
                        new Paragraph('\n'),
                        table1,
                        new Paragraph('\n'),
                        ...req.body.info.letter_half2.split('\n').map((line) => new Paragraph({
                            style: 'customStyle',
                            alignment: AlignmentType.JUSTIFIED,
                            children: [
                                new TextRun({
                                    text: line,
                                    size: 24,
                                    font: font_general,
                                    color: '#03396c',

                                }),

                            ],

                        })),
                        new Paragraph({ children: [new PageBreak()] }),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph({
                            style: "mystyling1",
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Exhibit A',
                                    size: 32,
                                    font: font_general,
                                    bold: true,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph({
                            style: "mystyling1",
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({
                                    text: 'Key Personnel Information',
                                    size: 32,
                                    font: font_general,
                                    bold: true,
                                    color: '#03396c',
                                    // color : '#000080',
                                    spacing: {
                                        // line : 360,
                                        after: 400
                                    }
                                }),
                            ],
                        }),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Paragraph('\n'),
                        new Table({
                            style: "mystyling1",
                            alignment: AlignmentType.CENTER,
                            width: {
                                size: 11070,
                                type: WidthType.DXA,
                            },
                            rows: [
                                new TableRow({
                                    children: columnHeadings.map(heading => (
                                        new TableCell({
                                            width: {
                                                size: 11070,
                                                type: WidthType.DXA,
                                            },
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: heading,
                                                        size: 28,
                                                        font: font_general,
                                                        bold: true,
                                                        color: '#03396c'
                                                    }),
                                                ],
                                            })],
                                        })
                                    )),
                                }),

                                ...tableRowArray.flat()
                            ],
                        }),
                    ],
                },
            ],
        });


        Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync("Output1.docx", buffer);
            const filePath = path.resolve('Output1.docx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename=Output1.docx');

            // Send the buffer as the response
            res.send(buffer);
            // res.send(200)

        });
    } catch (error) {
        console.log('Error generating document:', error);
        console.log("doc", error)
        res.sendStatus(500);
    }
})







router.post('/getrfdata', async (req, res) => {
    const rfpData = await RFP.findOne({ rfp: req.body.rfp });
    if (!rfpData) {
        return res.send("User not found,Check RFP once")
    }
    res.send(rfpData)
})

module.exports = router