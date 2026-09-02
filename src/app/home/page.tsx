"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Alert,
  AppBar,
  Box,
  BoxProps,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Grid, keyframes } from '@mui/system';
import Image from "next/image";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import ShoppingBasketOutlined from "@mui/icons-material/ShoppingBasketOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

export default function Homepage() {
    const slideInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(60px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
    `;

    const slideInLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-60px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
    `;

    const slideInRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(60px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
    `;

    interface AnimatedBoxProps extends Omit<BoxProps, 'animation'> {
    children: React.ReactNode;
    delay?: number;
    animation?: 'up' | 'left' | 'right';
    }

    const AnimatedBox = React.forwardRef<HTMLDivElement, AnimatedBoxProps>(
    ({ children, delay = 0, animation = 'up', sx, ...props }, ref) => {
        const innerRef = useRef<HTMLDivElement>(null);
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
            },
            { threshold: 0.1 }
        );

        const currentRef = innerRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
        }, []);

        const animationMap = {
        up: slideInUp,
        left: slideInLeft,
        right: slideInRight,
        };

        return (
        <Box
            ref={ref || innerRef}
            sx={{
            animation: isVisible ? `${animationMap[animation]} 0.8s ease-out ${delay}s both` : 'none',
            ...sx,
            }}
            {...props}
        >
            {children}
        </Box>
        );
    }
    );

    AnimatedBox.displayName = 'AnimatedBox';

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

    const navItems = [
    { label: 'About us', id: 'aboutus' },
    { label: 'Shop', id: 'shop' },
    { label: 'Best Deals', id: 'bestdeals' },
    { label: 'Contact', id: 'contact' },
    ];

    const menuItems = [
    { label: 'Cake', id: 'cake', image: '/cake.jpg' },
    { label: 'Meat Pie', id: 'meat-pie', image: '/meat-pie.jpg' },
    { label: 'Donuts', id: 'donut', image: '/donuts.jpg' },
    { label: 'Smoothie', id: 'smoothie', image: '/smoothie.jpg' },
    { label: 'Fruit Juice', id: 'fruit-juice', image: '/fruit-juice.jpg' },
    ];

    const pastryItems = [
        "Cakes",
        "Meat Pies",
        "Jam Donuts",
        "Iced Donuts",
        "Fruit Juice",
        "Smoothies",
        "Cake Slices",
        "Cupcakes",
        "Sausage Pies",
        ];

    const [activeShopTab, setActiveShopTab] = useState<'Cakes' | 'Pastry' | 'Juices'>('Cakes');

    const shopTabs = ['Cakes', 'Pastry', 'Juices'] as const;

    const shopProducts: Record<'Cakes' | 'Pastry' | 'Juices', Array<{ name: string; image: string; price: string }>> = {
        Cakes: [
            { name: 'Cake', image: '/cake.jpg', price: '₦18,000' },
            { name: 'Cake Slice', image: '/cake.jpg', price: '₦750' },
            { name: 'Cupcake', image: '/cake.jpg', price: '₦600' },
        ],
        Pastry: [
            { name: 'Meat Pie', image: '/meat-pie.JPG', price: '₦900' },
            { name: 'Donut', image: '/donuts.jpg', price: '₦550' },
            { name: 'Sausage Roll', image: '/meat-pie.JPG', price: '₦800' },
            { name: 'Puff Pastry', image: '/donuts.jpg', price: '₦650' },
            { name: 'Bun', image: '/meat-pie.JPG', price: '₦450' },
        ],
        Juices: [
            { name: 'Fruit Juice', image: '/fruit-juice.JPG', price: '₦800' },
            { name: 'Smoothie', image: '/smoothie.JPG', price: '₦2,500' },
            { name: 'Fresh Juice (Cocktail)', image: '/fruit-juice.JPG', price: '₦750' },
        ],
    };

    return(
        <div>
            <AppBar
                position="fixed"
                sx={{
                backgroundColor: '#fff8f0',
                boxShadow: 'none',
                zIndex: 1000,
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'space-between',
                        py: 1,
                    }}
                >
                <Box
                    component="img"
                    src="/spice-and-soul-logo-round.png"
                    alt="spice-and-soul-logo-round"
                    sx={{
                        alignItems: 'center',
                        width: 80,
                    }}
                />

                <Box
                    sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                    gap: { md: 8 },
                    }}
                >
                    {navItems.map((item) => (
                    <Box
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.3,
                        cursor: 'pointer',
                        
                        }}
                    >
                       <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            // backgroundColor: activeSection === item.id ? '#000' : 'transparent',
                            transition: 'all 0.3s ease',
                            // opacity: activeSection === item.id ? 1 : 0.4,
                        }}
                        />
                        <Typography
                        sx={{
                            fontFamily: 'Tahoma',
                            fontSize: { xs: '12px', md: '14px' },
                            fontWeight: { xs: 400, md: 600 },
                            letterSpacing: '2px',
                            color: '#000',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                            color: '#5f3a5f',
                            },
                        }}
                        >
                        {item.label}
                        </Typography>
                    </Box>
                    ))}
                </Box>
                </Toolbar>
            </AppBar>

            <Box
                id="home"
                ref={(node: HTMLDivElement | null) => {
                // sectionRefs.current.home = node;
                }}
                sx={{
                backgroundColor: '#facefa',
                paddingTop: {xs: '100px', md: '150px'},
                paddingBottom: '60px',
                position: 'relative',
                minHeight: {xs: '80vh', md: '90vh'},
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 6, md: 6 }}>
                    <Box sx={{
                        padding: { xs: '20px', md: '40px' },
                    }} >
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#a02105',
                            fontSize: '18px',
                            fontFamily: 'Trebuchet MS',
                            fontWeight: 800,
                            textAlign: 'left',
                        }}
                    >
                        Shop</Typography>    
                    <Typography
                        variant="h1"
                        sx={{
                            color: '#488403',
                            fontSize: { xs: '36px', md: '75px' },
                            fontFamily: 'var(--font-nunito)',
                            fontWeight: 800,
                            textAlign: 'left',
                        }}
                    >
                        Pastries made 
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            color: '#5f3a5f',
                            fontSize: { xs: '36px', md: '75px' },
                            fontFamily: 'var(--font-nunito)',
                            fontWeight: 800,
                            textAlign: 'left',
                            pb: 3,
                        }}
                    >
                        Just for you!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#000',
                            fontSize: '20px',
                            fontFamily: 'georgia',
                            textAlign: 'left',
                            pb: 3,
                        }}
                    >
                    Indulge in our delectable treats and experience the perfect blend of flavors that will leave you craving for more.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#333',
                            fontSize: '16px',
                            fontFamily: 'trebuchet ms',
                            textAlign: 'left',
                            pb: 3,
                        }}
                    >
                        From classic favorites to custom creations, each pastry is made with quality ingredients, love, and attention to detail, 
                        ensuring it looks beautiful and tastes just as good.
                    </Typography>
                    <Box>
                        <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#488403',
                            color: '#fff',
                            fontSize: '16px',
                            fontFamily: 'var(--font-nunito)',
                            textAlign: 'center',
                            textTransform: 'none',
                            p: 2,
                            mr: 2,
                            borderRadius: '4px',
                        }}
                        >
                        Place Your Order 
                        </Button>
                        <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#5f3a5f',
                            color: '#5f3a5f',
                            fontSize: '16px',
                            fontFamily: 'var(--font-nunito)',
                            textAlign: 'center',
                            textTransform: 'none',
                            p: 2,
                            borderRadius: '4px',
                        }}
                        >
                        Pick your Dessert
                        </Button>
                    </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 6 }}>
                    <Box
                    component="img"
                    src="/pastries_main.png"
                    alt="remedy"
                    sx={{
                        height: 'auto',
                        width: { xs: '400px',  md: '600px' },
                        borderRadius: '50px',
                        border: 'none',
                        objectFit: 'cover',
                        position: 'relative',
                        cursor: 'cell',
                        zIndex: 15,
                    }}
                    />
                </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#fff8f0',
                    py: { xs: 4, md: 12 },
                    px: { xs: 2, md: 6 },
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 1440,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: { xs: 3, md: 2 },
                        flexWrap: 'wrap',
                    }}
                >
                    {menuItems.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                flex: '1 1 180px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: { xs: 130, md: 180 },
                            }}
                        >
                            <Box
                                sx={{
                                    width: { xs: 130, md: 170 },
                                    height: { xs: 130, md: 170 },
                                    borderRadius: '50%',
                                    background: 'rgba(173, 214, 151, 0.18)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: { xs: 2, md: 3 },
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        inset: 12,
                                        borderRadius: '50%',
                                        background: 'rgba(173, 214, 151, 0.10)',
                                    },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.label}
                                    sx={{
                                        width: { xs: 90, md: 120 },
                                        height: { xs: 90, md: 120 },
                                        borderRadius: 5,
                                        objectFit: 'contain',
                                        position: 'relative',
                                        zIndex: 1,
                                        filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
                                    }}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontFamily: 'var(--font-nunito)',
                                    fontWeight: 700,
                                    fontSize: { xs: '1.1rem', md: '1.7rem' },
                                    color: '#111111',
                                    textAlign: 'center',
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box 
                            sx={{
                                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', px: 4, py: 8, 
                                position: 'relative',
                                backgroundImage: 'url(/pastry_silhouette.jpg)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
                                    zIndex: 1,
                                }
                            }}
                        >
                            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '40%', height: '100%', margin: 2}}>
                                <Box
                                    component="img"
                                    src={'/remedy_ai.png'}
                                    alt={'remedy'}
                                    sx={{
                                        width: "100%",
                                        pb: 1,
                                        borderRadius: 5,
                                        objectFit: 'contain',
                                        position: 'relative',
                                        zIndex: 1,
                                        filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
                                    }}
                                />
                                <Box>_</Box>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '40%', height: '100%', margin: 2}}>
                                <Box>_</Box>
                                <Box
                                    component="img"
                                    src={'/cake_slice.jpg'}
                                    alt={'remedy'}
                                    sx={{
                                        width: "100%",
                                        pt: 1,
                                        borderRadius: 5,
                                        objectFit: 'contain',
                                        position: 'relative',
                                        zIndex: 1,
                                        filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
                                    }}
                                />
                                
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{px: 2}}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#a02105',
                                    fontSize: '18px',
                                    fontFamily: 'Trebuchet MS',
                                    fontWeight: 800,
                                    textAlign: 'left',
                                    mb: 1,
                                }}
                            >
                                About Us
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: 'var(--font-nunito)',
                                    color: '#5f3a5f',
                                    fontWeight: 800,
                                    fontSize: { xs: '24px', md: '30px' },
                                    textAlign: 'left',
                                    mb: 1,
                                }}
                            >
                                Soulful flavors, fresh from our oven.
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.primary',
                                    fontFamily: 'verdana',
                                    fontSize: { xs: '16px', md: '18px' },
                                    textAlign: 'left',
                                    lineHeight: 1.8,
                                }}
                            >
                                Welcome to Spice and Soul Bake House Hub, where every bite is a celebration of taste and tradition.
                                Our name says it all: Spice for the exciting flavors that make life delicious, 
                                and Soul for the heart we put into every pastry.
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h5" sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, }} gutterBottom>
                                    What We Serve
                                </Typography>
                                <Box
                                    sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 3,
                                    alignItems: "center",
                                    }}
                                >
                                    {pastryItems.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                    >
                                        <Image
                                        src="/cake_icon.jpg"
                                        alt="icon"
                                        width={20}
                                        height={20}
                                        style={{ objectFit: "contain" }}
                                        />
                                        <Typography variant="body1" sx={{ fontFamily: 'verdana' }}>
                                            {item}
                                        </Typography>
                                    </Box>
                                    ))}
                                </Box>
                                <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.primary',
                                    fontFamily: 'verdana',
                                    fontSize: { xs: '14px', md: '16px' },
                                    textAlign: 'left',
                                    lineHeight: 1.8,
                                    mt: 2,
                                }}
                            >
                                Whether you’re craving something sweet, savory, or refreshing, we’ve got delights that bring people together and make every moment special.
                            </Typography>
                                <Button
                                    variant="contained"
                                    endIcon={<ShoppingCartOutlined sx={{ fontSize: 20 }} />}
                                    sx={{
                                        backgroundColor: '#488403',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontFamily: 'var(--font-nunito)',
                                        textAlign: 'center',
                                        textTransform: 'none',
                                        py: 1.5,
                                        px: 2,
                                        my: 4,
                                        borderRadius: '4px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        '&:hover': {
                                            backgroundColor: '#3d6d02',
                                        },
                                    }}
                                    >
                                    Shop Now 
                            </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#f5f5f5',
                    py: { xs: 7, md: 10 },
                    px: { xs: 3, md: 6 },
                    textAlign: 'center',
                }}
            >
                <Typography
                    sx={{
                        color: '#7abf2d',
                        fontFamily: 'var(--font-nunito)',
                        fontSize: { xs: '1rem', md: '1.5rem' },
                        fontWeight: 700,
                        mb: 2,
                    }}
                >
                    How It Works
                </Typography>

                <Typography
                    sx={{
                        color: '#111111',
                        fontFamily: 'var(--font-nunito)',
                        fontSize: { xs: '1.5rem', md: '2.2rem' },
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.05em',
                        mb: 2,
                    }}
                >
                    Don&apos;t Worry, We&apos;ll Deliver
                </Typography>

                <Typography
                    sx={{
                        color: '#3b3b3b',
                        fontFamily: 'Georgia, serif',
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        lineHeight: 1.6,
                        maxWidth: 800,
                        mx: 'auto',
                        mb: { xs: 5, md: 8 },
                    }}
                >
                     We partner with local bakers and trusted suppliers to bring you the freshest pastries, 
                     wholesome ingredients, and delightful flavors every day.
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(260px, 1fr))' },
                        gap: { xs: 5, md: 3 },
                        maxWidth: 1200,
                        mx: 'auto',
                    }}
                >
                    {[
                        {
                            icon: <ShoppingBasketOutlined sx={{ fontSize: 60 }} />,
                            title: '1. Choose Items',
                            text: 'Shop online right on this website and select the items you need.',
                            color: '#f39746',
                        },
                        {
                            icon: <ReceiptLongOutlined sx={{ fontSize: 60 }} />,
                            title: '2. Place Order',
                            text: 'Add the items to cart and pay for your order online, then specify the delivery time frame.',
                            color: '#f39746',
                        },
                        {
                            icon: <LocalShippingOutlined sx={{ fontSize: 60 }} />,
                            title: '3. Receive Pastries',
                            text: 'We will deliver your order right on time. We use eco-friendly packaging.',
                            color: '#f39746',
                        },
                    ].map((step) => (
                        <Box key={step.title}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    px: { xs: 1, md: 3 },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: 100, md: 150 },
                                        height: { xs: 100, md: 150 },
                                        borderRadius: '50%',
                                        border: `none`,
                                        backgroundColor: 'rgba(243, 151, 70, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: step.color,
                                        mb: 3,
                                    }}
                                >
                                    {step.icon}
                                </Box>

                                <Typography
                                    sx={{
                                        color: '#111111',
                                        fontFamily: 'var(--font-nunito)',
                                        fontWeight: 800,
                                        fontSize: { xs: '1.5rem', md: '2rem' },
                                        lineHeight: 1.25,
                                        mb: 2,
                                    }}
                                >
                                    {step.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: '#444444',
                                        fontFamily: 'Georgia, serif',
                                        fontSize: { xs: '0.8rem', md: '1rem' },
                                        lineHeight: 1.7,
                                        maxWidth: 420,
                                        textAlign: 'center',
                                        mx: 'auto',
                                    }}
                                >
                                    {step.text}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#f8f5f2',
                    py: { xs: 7, md: 10 },
                    px: { xs: 3, md: 6 },
                    textAlign: 'center',
                }}
            >
                <Typography
                    sx={{
                        color: '#f39b43',
                        fontFamily: 'var(--font-nunito)',
                        fontSize: { xs: '1rem', md: '1.6rem' },
                        fontWeight: 700,
                        mb: 2,
                    }}
                >
                    Shop Now
                </Typography>

                <Typography
                    sx={{
                        color: '#111111',
                        fontFamily: 'var(--font-nunito)',
                        fontSize: { xs: '2.3rem', md: '4rem' },
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: '-0.06em',
                        mb: 2,
                    }}
                >
                    Right out the Oven
                </Typography>

                <Typography
                    sx={{
                        color: '#3a3a3a',
                        fontFamily: 'Georgia, serif',
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        lineHeight: 1.6,
                        maxWidth: 800,
                        mx: 'auto',
                        mb: 4,
                    }}
                >
                    We bake daily with fresh ingredients and small-batch care, bringing you warm, handcrafted pastries made to satisfy every craving.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: { xs: 2, md: 5 },
                        mb: 4,
                        flexWrap: 'wrap',
                    }}
                >
                    {shopTabs.map((tab) => {
                        const active = activeShopTab === tab;
                        return (
                            <Button
                                key={tab}
                                onClick={() => setActiveShopTab(tab)}
                                sx={{
                                    minWidth: 120,
                                    px: 1,
                                    py: 1,
                                    borderRadius: 0,
                                    borderBottom: active ? '3px solid #f39b43' : '1px solid rgba(17,17,17,0.18)',
                                    backgroundColor: 'transparent',
                                    color: '#111111',
                                    fontFamily: 'var(--font-nunito)',
                                    fontSize: { xs: '0.8rem', md: '1rem' },
                                    fontWeight: active ? 700 : 500,
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                {tab}
                            </Button>
                        );
                    })}
                </Box>

                <Box
                    // sx={{
                    //     borderTop: '1px solid rgba(17,17,17,0.18)',
                    //     pt: 0,
                    // }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, minmax(220px, 1fr))', xl: 'repeat(4, minmax(220px, 1fr))' },
                            gap: 2,
                            maxWidth: 1500,
                            mx: 'auto',
                        }}
                    >
                        {shopProducts[activeShopTab].map((product) => (
                            <Box
                                key={product.name}
                                sx={{
                                    background: 'rgba(243, 232, 226, 0.7)',
                                    border: '1px solid rgba(17,17,17,0.05)',
                                    minHeight: 300,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: 0,
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    sx={{
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(243,232,226,0.75) 100%)',
                                        height: 290,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        px: 2,
                                        py: 3,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={product.image}
                                        alt={product.name}
                                        sx={{
                                            width: '100%',
                                            height: 220,
                                            objectFit: 'contain',
                                            display: 'block',
                                            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                                        }}
                                    />
                                </Box>

                                <Box sx={{ px: 3, pb: 3, pt: 1, textAlign: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontFamily: 'var(--font-nunito)',
                                            fontSize: { xs: '1rem', md: '1.4rem' },
                                            fontWeight: 500,
                                            color: '#111111',
                                            mb: 1,
                                        }}
                                    >
                                        {product.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontFamily: 'var(--font-nunito)',
                                            fontSize: { xs: '0.8rem', md: '1.2rem' },
                                            fontWeight: 700,
                                            color: '#7abf2d',
                                            mb: 2,
                                        }}
                                    >
                                        {product.price}
                                    </Typography>

                                    <Button
                                        variant="outlined"
                                        sx={{
                                            minWidth: 150,
                                            color: '#488403',
                                            borderColor: '#7abf2d',
                                            backgroundColor: 'transparent',
                                            borderWidth: 2,
                                            fontFamily: 'var(--font-nunito)',
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            px: 3,
                                            py: 1,
                                            borderRadius: 0,
                                            '&:hover': {
                                                backgroundColor: 'rgba(72,132,3,0.04)',
                                                borderColor: '#488403',
                                            },
                                        }}
                                    >
                                        Buy Now
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </div>
    )
}