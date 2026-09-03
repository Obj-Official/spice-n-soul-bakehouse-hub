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
import CloseIcon from "@mui/icons-material/Close";
import FacebookOutlined from "@mui/icons-material/FacebookOutlined";
import Instagram from "@mui/icons-material/Instagram";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import ShoppingBasketOutlined from "@mui/icons-material/ShoppingBasketOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Twitter from "@mui/icons-material/Twitter";
import WhatsApp from "@mui/icons-material/WhatsApp";

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
      const currentRef = (typeof ref === 'function' ? null : ref?.current) ?? innerRef.current;
      if (!currentRef) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.12 }
      );

      observer.observe(currentRef);
      return () => {
        observer.unobserve(currentRef);
      };
    }, [ref]);

    const animationMap = {
      up: slideInUp,
      left: slideInLeft,
      right: slideInRight,
    };

    return (
      <Box
        ref={ref ?? innerRef}
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

const PastryTray = () => {
  return (
    <Box
      component="img"
      src="/pastries_main.png"
      alt="pastry tray"
      sx={{
        height: 'auto',
        width: { xs: '400px', md: '600px' },
        borderRadius: '50px',
        border: 'none',
        objectFit: 'cover',
        position: 'relative',
        cursor: 'cell',
        zIndex: 15,
      }}
    />
  );
};

export default function Homepage() {

    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const target = sectionRefs.current[sectionId] ?? document.getElementById(sectionId);
        if (!target) return;

        const offset = window.innerWidth < 900 ? 88 : 110;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    const navItems = [
    { label: 'Home', id: 'home' },
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
            { name: 'Cake Slice', image: '/velvet-cake-slice.jpg', price: '₦750' },
            { name: 'Cupcake', image: '/cupcake.jpg', price: '₦600' },
        ],
        Pastry: [
            { name: 'Meat Pie', image: '/meat-pie.jpg', price: '₦900' },
            { name: 'Donut', image: '/donuts.jpg', price: '₦550' },
            { name: 'Sausage Roll', image: '/sausage-roll.png', price: '₦800' },
            { name: 'Puff Pastry', image: '/puff-pastry.jpg', price: '₦650' },
            { name: 'Bun', image: '/buns.jpg', price: '₦450' },
        ],
        Juices: [
            { name: 'Fruit Juice', image: '/fruit-juice.jpg', price: '₦800' },
            { name: 'Smoothie', image: '/smoothie.jpg', price: '₦2,500' },
            { name: 'Fresh Juice (Cocktail)', image: '/cocktail.jpg', price: '₦750' },
        ],
    };

    const customerReviews = [
        {
            name: 'Adijat O.',
            title: 'Birthday cake client',
            text: 'The cake looked beautiful and tasted even better. Every guest kept asking where it was from.',
        },
        {
            name: 'Bukola K.',
            title: 'Office delivery',
            text: 'Fast delivery, the cake and meatpie had amazing texture and delicious. Will definitely order again.',
        },
        {
            name: 'Tony A.',
            title: 'Weekend treat order',
            text: 'Their meat pies and smoothies are a regular part of our weekends now. Fresh, comforting, delicious.',
        },
    ];

    const WHATSAPP_NUMBER = '+2347046761484';
    const [fabVisible, setFabVisible] = useState(false);
    const [fabCollapsed, setFabCollapsed] = useState(false);
    const [fabOpen, setFabOpen] = useState(false);
    const [fabMessage, setFabMessage] = useState("Hi Spice & Soul, I would like to place an order.");
    const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [purchaseItem, setPurchaseItem] = useState<{ name: string; price: string }>({ name: '', price: '' });
    const [orderDetails, setOrderDetails] = useState('Hi Spice & Soul, I would like to place an order.');

    useEffect(() => {
        const timeoutId = window.setTimeout(() => setFabVisible(true), 5000);
        return () => window.clearTimeout(timeoutId);
    }, []);

    const getWhatsAppUrl = (message: string) => {
        const cleanedNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
        return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
    };

    const openWhatsApp = (message: string) => {
        window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    };

    const handleOpenPurchaseModal = (productName: string, productPrice: string) => {
        setPurchaseItem({ name: productName, price: productPrice });
        setPurchaseModalOpen(true);
    };

    const handleProceedPurchase = () => {
        if (!purchaseItem.name) return;
        const message = `Hello Spice & Soul, I want to purchase ${purchaseItem.name} at ${purchaseItem.price}.`;
        openWhatsApp(message);
        setPurchaseModalOpen(false);
    };

    const handleSendFabMessage = () => {
        const message = fabMessage.trim() || 'Hi Spice & Soul, I would like to place an order.';
        openWhatsApp(message);
        setFabOpen(false);
    };

    const handleSendOrderMessage = () => {
        const message = orderDetails.trim() || 'Hi Spice & Soul, I would like to place an order.';
        openWhatsApp(message);
        setOrderModalOpen(false);
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
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1,
                        minHeight: { xs: 72, md: 88 },
                        position: 'relative',
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
                            transition: 'all 0.3s ease',
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

                <IconButton
                    aria-label="toggle navigation menu"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        color: '#5f3a5f',
                        border: '1px solid rgba(95,58,95,0.2)',
                        borderRadius: 2,
                    }}
                >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
                </Toolbar>

                <Box
                    sx={{
                        display: { xs: mobileMenuOpen ? 'flex' : 'none', md: 'none' },
                        flexDirection: 'column',
                        gap: 1.5,
                        px: 2,
                        pb: 2,
                        backgroundColor: '#fff8f0',
                        borderTop: '1px solid rgba(95,58,95,0.15)',
                    }}
                >
                    {navItems.map((item) => (
                        <Box
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            sx={{
                                py: 1,
                                px: 1,
                                cursor: 'pointer',
                                borderBottom: '1px solid rgba(17,17,17,0.08)',
                                color: '#000',
                            }}
                        >
                            <Typography sx={{ fontFamily: 'Tahoma', fontWeight: 600, letterSpacing: '1.5px' }}>
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </AppBar>

            <AnimatedBox
                component="section"
                id="home"
                ref={(node: HTMLDivElement | null) => {
                    sectionRefs.current.home = node;
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
                scrollMarginTop: { xs: '90px', md: '110px' },
                }}
            >
                <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <AnimatedBox
                        animation="left"
                        delay={0.12}
                        sx={{
                        padding: { xs: '20px', md: '40px' },
                    }} >
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#a02105',
                            fontSize: {xs:'14px', md:'18px'},
                            fontFamily: 'Trebuchet MS',
                            fontWeight: 800,
                            textAlign: {xs:'center', md:'left'},
                        }}
                    >
                        Shop</Typography>    
                    <Typography
                        variant="h1"
                        sx={{
                            color: '#488403',
                            fontSize: { xs: '45px', md: '75px' },
                            fontFamily: 'var(--font-nunito)',
                            fontWeight: 800,
                            textAlign: {xs:'center', md:'left'},
                        }}
                    >
                        Pastries made 
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            color: '#5f3a5f',
                            fontSize: { xs: '45px', md: '75px' },
                            fontFamily: 'var(--font-nunito)',
                            fontWeight: 800,
                            textAlign: {xs:'center', md:'left'},
                            pb: 3,
                        }}
                    >
                        Just for you!
                    </Typography>
                    <Box sx={{display: {xs: 'block', md: 'none'}, mb: 2}}><PastryTray/></Box>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#000',
                            fontSize: '20px',
                            fontFamily: 'georgia',
                            textAlign: {xs:'center', md:'left'},
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
                            textAlign: {xs:'center', md:'left'},
                            pb: 3,
                        }}
                    >
                        From classic favorites to custom creations, each pastry is made with quality ingredients, love, and attention to detail, 
                        ensuring it looks beautiful and tastes just as good.
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: {xs: 'space-evenly', md: 'normal'} , alignItems: {xs: 'center'}}}>
                        <Button
                        variant="contained"
                        onClick={() => setOrderModalOpen(true)}
                        sx={{
                            backgroundColor: '#488403',
                            color: '#fff',
                            fontSize: '16px',
                            fontFamily: 'var(--font-nunito)',
                            textAlign: 'center',
                            textTransform: 'none',
                            p: {xs:1, md:2},
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
                            p: {xs:1, md:2},
                            borderRadius: '4px',
                        }}
                        >
                        Pick your Dessert
                        </Button>
                    </Box>
                    </AnimatedBox>
                </Grid>
                <Grid size={{ xs: 0, md: 6 }} sx={{display: {xs:'none', md: 'block'}}}>
                    <AnimatedBox animation="right" delay={0.2}>
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
                    </AnimatedBox>
                </Grid>
                </Grid>
            </AnimatedBox>
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
                        <AnimatedBox
                            key={item.id}
                            animation="up"
                            delay={0.06}
                            sx={{
                                flex: '1 1 180px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: { xs: 100, md: 180 },
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
                        </AnimatedBox>
                    ))}
                </Box>
            </Box>
            <AnimatedBox
                component="section"
                id="aboutus"
                ref={(node: HTMLDivElement | null) => {
                    sectionRefs.current.aboutus = node;
                }}
                sx={{
                    scrollMarginTop: { xs: '90px', md: '110px' },
                }}
            >
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AnimatedBox animation="left" delay={0.12} sx={{
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
                            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: {xs: '60%', md:'40%'}, height: '100%', margin: 2}}>
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

                            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: {xs: '60%', md:'40%'}, height: '100%', margin: 2}}>
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
                        </AnimatedBox>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AnimatedBox animation="right" delay={0.18} sx={{px: 2}}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#a02105',
                                    fontSize: {xs: '14px', md:'18px'},
                                    fontFamily: 'Trebuchet MS',
                                    fontWeight: 800,
                                    textAlign: 'left',
                                    mb: {xs:2, md: 1},
                                    mt: {xs:2}
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
                                    onClick={() => setOrderModalOpen(true)}
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
                        </AnimatedBox>
                    </Grid>
                </Grid>
            </AnimatedBox>

            <AnimatedBox
                component="section"
                id="bestdeals"
                ref={(node: HTMLDivElement | null) => {
                    sectionRefs.current.bestdeals = node;
                }}
                sx={{
                    width: '100%',
                    backgroundColor: '#f5f5f5',
                    py: { xs: 7, md: 10 },
                    px: { xs: 3, md: 6 },
                    textAlign: 'center',
                    scrollMarginTop: { xs: '90px', md: '110px' },
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
                    ].map((step, index) => (
                        <AnimatedBox key={step.title} animation={index % 2 === 0 ? 'left' : 'right'} delay={0.08 * index}>
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
                                        width: { xs: 80, md: 150 },
                                        height: { xs: 80, md: 150 },
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
                                        fontSize: { xs: '1.2rem', md: '2rem' },
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
                        </AnimatedBox>
                    ))}
                </Box>
            </AnimatedBox>

            <AnimatedBox
                component="section"
                id="shop"
                ref={(node: HTMLDivElement | null) => {
                    sectionRefs.current.shop = node;
                }}
                sx={{
                    width: '100%',
                    backgroundColor: '#f8f5f2',
                    py: { xs: 7, md: 10 },
                    px: { xs: 3, md: 6 },
                    textAlign: 'center',
                    scrollMarginTop: { xs: '90px', md: '110px' },
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
                                    minWidth: 100,
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

                <Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, minmax(220px, 1fr))', xl: 'repeat(4, minmax(220px, 1fr))' },
                            gap: 2,
                            maxWidth: 1500,
                            mx: 'auto',
                        }}
                    >
                        {shopProducts[activeShopTab].map((product, index) => (
                            <AnimatedBox
                                key={product.name}
                                animation={index % 2 === 0 ? 'up' : 'right'}
                                delay={0.06 * index}
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
                                        onClick={() => handleOpenPurchaseModal(product.name, product.price)}
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
                            </AnimatedBox>
                        ))}
                    </Box>
                </Box>
            </AnimatedBox>

            <Box
                component="section"
                sx={{
                    width: '100%',
                    backgroundColor: '#f8f5f2',
                    py: { xs: 8, md: 10 },
                    px: { xs: 3, md: 6 },
                }}
            >
                <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                    <AnimatedBox animation="up" delay={0.08} sx={{ textAlign: 'center', mb: 5 }}>
                        <Typography
                            sx={{
                                color: '#5f3a5f',
                                fontFamily: 'var(--font-nunito)',
                                fontSize: { xs: '0.9rem', md: '1.1rem' },
                                fontWeight: 800,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                mb: 1,
                            }}
                        >
                            What customers say
                        </Typography>
                        <Typography
                            sx={{
                                color: '#111111',
                                fontFamily: 'var(--font-nunito)',
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 800,
                            }}
                        >
                            Loved by families and sweet tooths alike
                        </Typography>
                    </AnimatedBox>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(220px, 1fr))' },
                            gap: 3,
                        }}
                    >
                        {customerReviews.map((review, index) => (
                            <AnimatedBox
                                key={review.name}
                                animation={index % 2 === 0 ? 'left' : 'right'}
                                delay={0.08 * index}
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 4,
                                    p: { xs: 3, md: 4 },
                                    boxShadow: '0 14px 35px rgba(95, 58, 95, 0.08)',
                                    border: '1px solid rgba(95,58,95,0.08)',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #5f3a5f, #488403)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontFamily: 'var(--font-nunito)',
                                            fontWeight: 800,
                                        }}
                                    >
                                        {review.name.charAt(0)}
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, color: '#111111' }}>
                                            {review.name}
                                        </Typography>
                                        <Typography sx={{ fontFamily: 'Verdana', fontSize: '0.7rem', color: '#5f3a5f' }}>
                                            {review.title}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'Georgia, serif',
                                        fontSize: { xs: '1rem', md: '1.06rem' },
                                        lineHeight: 1.8,
                                    }}
                                >
                                    “{review.text}”
                                </Typography>
                            </AnimatedBox>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box
                component="section"
                id="contact"
                ref={(node: HTMLDivElement | null) => {
                    sectionRefs.current.contact = node;
                }}
                sx={{
                    width: '100%',
                    backgroundColor: '#fff8f0',
                    py: { xs: 7, md: 10 },
                    px: { xs: 3, md: 6 },
                    scrollMarginTop: { xs: '90px', md: '110px' },
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1100,
                        mx: 'auto',
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, rgba(95,58,95,0.08), rgba(72,132,3,0.08))',
                        border: '1px solid rgba(95,58,95,0.15)',
                        p: { xs: 3, md: 5 },
                    }}
                >
                    <AnimatedBox animation="up" delay={0.08} sx={{ textAlign: 'center' }}>
                        <Typography
                            sx={{
                                color: '#a02105',
                                fontFamily: 'Trebuchet MS',
                                fontWeight: 800,
                                fontSize: { xs: '0.9rem', md: '1.1rem' },
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                mb: 2,
                            }}
                        >
                            Contact
                        </Typography>
                        <Typography
                            sx={{
                                color: '#111111',
                                fontFamily: 'var(--font-nunito)',
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Let&apos;s bake your next favorite treat.
                        </Typography>
                        <Typography
                            sx={{
                                color: '#333333',
                                fontFamily: 'Georgia, serif',
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                lineHeight: 1.7,
                                maxWidth: 760,
                                mx: 'auto',
                                mb: 3,
                            }}
                        >
                            Call us, message us, or order online for cakes, pastries, juices, and custom dessert boxes made with care.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                onClick={() => setOrderModalOpen(true)}
                                sx={{
                                    backgroundColor: '#488403',
                                    color: '#fff',
                                    textTransform: 'none',
                                    px: 3,
                                    py: 1.5,
                                }}
                            >
                                Order Now
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: '#5f3a5f',
                                    borderColor: '#5f3a5f',
                                    textTransform: 'none',
                                    px: 3,
                                    py: 1.5,
                                }}
                            >
                                +234 704 676 1484
                            </Button>
                        </Box>
                    </AnimatedBox>
                </Box>
            </Box>

            <Box
                component="footer"
                sx={{
                    width: '100%',
                    backgroundColor: '#2a1231',
                    color: '#fff',
                    py: { xs: 4, md: 5 },
                    px: { xs: 3, md: 6 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1200,
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        gap: 3,
                    }}
                >
                    <Box>
                        <Box
                            component="img"
                            src="/spice-and-soul-logo-round.png"
                            alt="spice-and-soul-logo-round"
                            sx={{ width: 70, mb: 1.5 }}
                        />
                        <Typography sx={{ fontFamily: 'var(--font-nunito)', fontSize: '1rem', fontWeight: 800 }}>
                            Spice &amp; Soul Bake House Hub
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 2 }, flexWrap: 'wrap' }}>
                        {navItems.map((item) => (
                            <Typography
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                sx={{
                                    fontFamily: 'Tahoma',
                                    fontSize: '0.78rem',
                                    letterSpacing: '2px',
                                    cursor: 'pointer',
                                    color: '#fff',
                                    '&:hover': { color: '#f7d9a3' },
                                }}
                            >
                                {item.label}
                            </Typography>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <IconButton href="https://wa.me/2347046761484" target="_blank" rel="noreferrer" size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <WhatsApp fontSize="small" />
                        </IconButton>
                        <IconButton href="https://instagram.com" target="_blank" rel="noreferrer" size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <Instagram fontSize="small" />
                        </IconButton>
                        <IconButton href="https://facebook.com" target="_blank" rel="noreferrer" size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <FacebookOutlined fontSize="small" />
                        </IconButton>
                        <IconButton href="https://twitter.com" target="_blank" rel="noreferrer" size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <Twitter fontSize="small" />
                        </IconButton>
                    </Box>

                    <Typography sx={{ fontFamily: 'Georgia, serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                        © 2026 Spice &amp; Soul Bake House Hub. All rights reserved.
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    position: 'fixed',
                    right: { xs: 5, md: 10 },
                    bottom: 0,
                    zIndex: 1300,
                    transform: fabVisible ? 'translateX(0)' : 'translateX(160px)',
                    opacity: fabVisible ? 1 : 0,
                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                
                <IconButton
                    onClick={() => setFabCollapsed((open) => !open)}
                    sx={{
                        mt: fabCollapsed ? 0 : 0.5,
                        boxShadow: '0 8px 16px rgba(95,58,95,0.12)',
                        color: '#5f3a5f',
                        width: fabCollapsed ? 35 : 5,
                        height: fabCollapsed ? 35 : 5,
                        right: 0,
                        top: 0,
                        ml: 12
                    }}
                    aria-label={fabCollapsed ? 'Expand floating assistant' : 'Collapse floating assistant'}
                >
                    {fabCollapsed ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>

                {!fabCollapsed && (
                    <IconButton
                        onClick={() => setFabOpen(true)}
                        sx={{
                            p: 0,
                            borderRadius: '50%',
                            background: 'transparent',
                        }}
                    >
                        <Box
                            component="img"
                            src="/remedy-fab_x.png"
                            alt="Spice & Soul assistant"
                            sx={{
                                width: { xs: 140, md: 160 },
                                height: { xs: 220, md: 250 },
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </IconButton>
                )}
            </Box>

            <Dialog
                open={fabOpen}
                onClose={() => setFabOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 4,
                            width: 'min(420px, 92vw)',
                            maxWidth: '420px',
                            overflow: 'hidden',
                            background: '#f3f5f7',
                        },
                    },
                }}
            >
                <Box sx={{ background: 'linear-gradient(135deg, #1c9d5d, #25d366)', p: 2, color: '#fff', position: 'relative' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box component="img" src="/remedy_ai.png" alt="remedy" sx={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', backgroundColor: '#fff' }} />
                            <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: '1rem' }}>Spice &amp; Soul Bake House Hub</Typography>
                        </Box>
                        <IconButton onClick={() => setFabOpen(false)} sx={{ color: '#fff' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ p: 2, position: 'relative', pb: 3 }}>
                    <Box component="img" src="/remedy_ai.png" alt="remedy" sx={{ position: 'absolute', right: 18, bottom: 18, width: 80, opacity: 0.12 }} />
                    <Typography sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: '1.1rem', mb: 1.5, color: '#111' }}>
                        Tell us what you want
                    </Typography>
                    <TextField
                        multiline
                        minRows={5}
                        value={fabMessage}
                        onChange={(event) => setFabMessage(event.target.value)}
                        fullWidth
                        placeholder="Hi Spice & Soul, I want to order..."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: '#fff',
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="contained"
                            onClick={handleSendFabMessage}
                            startIcon={<WhatsApp />}
                            sx={{ backgroundColor: '#25d366', color: '#fff', textTransform: 'none' }}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Dialog>

            <Dialog
                open={purchaseModalOpen}
                onClose={() => setPurchaseModalOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 4,
                            width: 'min(420px, 92vw)',
                            maxWidth: '420px',
                            p: 1,
                        },
                    },
                }}
            >
                <DialogTitle sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800 }}>Purchase confirmation</DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: '1rem', color: '#111' }}>
                        Purchase {purchaseItem.name} at {purchaseItem.price}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setPurchaseModalOpen(false)} sx={{ color: '#5f3a5f', textTransform: 'none' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleProceedPurchase}
                        sx={{ backgroundColor: '#488403', color: '#fff', textTransform: 'none' }}
                    >
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={orderModalOpen}
                onClose={() => setOrderModalOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 4,
                            width: 'min(420px, 92vw)',
                            maxWidth: '420px',
                            p: 1,
                        },
                    },
                }}
            >
                <DialogTitle sx={{ fontFamily: 'var(--font-nunito)', fontWeight: 800 }}>Order details</DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        minRows={5}
                        fullWidth
                        value={orderDetails}
                        onChange={(event) => setOrderDetails(event.target.value)}
                        placeholder="Hi Spice & Soul, I would like to place an order."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setOrderModalOpen(false)} sx={{ color: '#5f3a5f', textTransform: 'none' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSendOrderMessage}
                        sx={{ backgroundColor: '#25d366', color: '#fff', textTransform: 'none' }}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}